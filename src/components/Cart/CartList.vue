<template>
    <div class="grid lg:grid-cols-4 sm:grid-cols-1 justify-between p-4 gap-8">
        <div class="lg:col-span-3 rounded-lg border p-4">
            <a-table :columns="columns" :data-source="cartData" :row-selection="rowSelection" :pagination='false'
                row-key="id" class="components-table-demo-nested overflow-x-auto">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'imageUrl'">
                        <div>
                            <img :src="toImageLink(record.imageUrl)" class="object-contain w-24" />
                        </div>
                    </template>
                    <template v-if="column.key === 'name'">
                        <div class="text-gray-400">{{ record.categoryName }}</div>
                        <div class="text-gray-500">
                            <router-link :to="{ name: 'Details', params: { id: record.productId.toString() } }">
                                {{ record.productName }}
                                {{ record.rom === 1 ? '1TB' : record.rom + 'GB' }} -
                                {{ record.colorName }}
                            </router-link>
                        </div>
                    </template>
                    <template v-if="column.key === 'price'">
                        <div class="text-gray-500">{{ fomratVND(record.price) }}</div>
                    </template>
                    <template v-if="column.key === 'quantity'">
                        <a-input-number v-model:value="record.quantity" :min="1" :max="record.inStock"
                            @change="debouncedUpdateCart(record.id, record.quantity)" />
                    </template>
                    <template v-if="column.key === 'sum'">
                        <div class="text-gray-500">{{ fomratVND(record.price * record.quantity) }}</div>
                    </template>
                    <template v-if="column.key === 'action'">
                        <a-button class="text-red-500 border-none" @click="delCart(record.id)">X</a-button>
                    </template>
                </template>
            </a-table>
        </div>

        <div class="rounded-lg border p-4 h-fit">
            <div class="border-b pb-4">
                <div class="flex justify-between">
                    <span>{{ t('cart.Subtotal') }}</span>
                    <span>{{ fomratVND(originPrice) }}</span>
                </div>
                <div class="flex justify-between text-red-500">
                    <span>{{ t('cart.Discount') }}</span>
                    <span>- {{ fomratVND(discount) }}</span>
                </div>
            </div>
            <div class="flex justify-between mt-4 font-bold text-lg">
                <span>{{ t('cart.Total') }}</span>
                <span>{{ fomratVND(total) }}</span>
            </div>
            <button class="bg-blue-500 text-white w-full mt-4 p-2 rounded" @click="goToCheckout">
                {{ $t('checkout.checkout') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import httpService from "../../services/http.service";
import { Cart_API } from "../../services/api_url";
import { CartTableData, useTableData } from "../../hooks/Data";
import { fomratVND, toImageLink } from "../../services/common.service";
import { debounce } from 'lodash';
import { useCartStore } from '../../hooks/CartStore';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { cartData, setCartData } = useTableData();
const originPrice = ref(0);
const discount = ref(0);
const total = ref(0);

function calculateTotalOriginPrice(items: CartTableData[]) {
    originPrice.value = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.originPrice;
        return acc + itemTotal;
    }, 0);
}

function calculateDisconut(items: CartTableData[]) {
    discount.value = items.reduce((acc, item) => {
        const itemTotal = (item.discount / 100) * item.originPrice;
        return acc + itemTotal;
    }, 0);
}

function calculateTotal(items: CartTableData[]) {
    total.value = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.price;
        return acc + itemTotal;
    }, 0);
}
const { t } = useI18n();
const columns = [
    { title: '', dataIndex: 'imageUrl', key: 'imageUrl' },
    { title: t('cart.Product'), dataIndex: 'name', key: 'name' },
    { title: t('cart.Price'), dataIndex: 'price', key: 'price' },
    { title: t('cart.Quantity'), dataIndex: 'quantity', key: 'quantity' },
    { title: t('cart.Sum'), dataIndex: 'sum', key: 'sum' },
    { title: t('cart.Action'), key: 'action' }
];

function getCart() {
    httpService.getWithAuth(Cart_API)
        .then(data => {
            const selectedRows = data.map((item: CartTableData) => ({
                ...item,
                showIcon: false,
            }));
            setCartData(selectedRows);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function updateCart(id: string, number: number) {
    try {
        const data = {
            quantity: number
        }
        const res = await httpService.putWithAuth(Cart_API + `/${id}`, data);
        console.log(res);
    } catch (error) {
        console.error("Error deleting cart:", error);
    }
}

const debouncedUpdateCart = debounce((id: string, quantity: number) => {
    updateCart(id, quantity)
        .then(() => {
            const selectedItem = selectedItems.value.find(item => item.id === id);
            if (selectedItem) {
                selectedItem.quantity = quantity;
                calculateTotal(selectedItems.value);
            }
        });
}, 700);


async function delCart(id: string) {
    try {
        await httpService.delWithAuth(Cart_API + `/${id}`);
        setCartData(cartData.value.filter(cart => cart.id !== id));
    } catch (error) {
        console.error("Error deleting cart:", error);
    }
}

const selectedItems = ref<CartTableData[]>([]);

const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[]) => {
        console.log("Selected Row Keys:");
        selectedRowKeys.forEach(key => {
            console.log(key);
        });
    },
    onSelect: (record: CartTableData, selected: boolean, selectedRows: CartTableData[]) => {
        selectedItems.value = selectedRows;
        calculateTotalOriginPrice(selectedRows);
        calculateDisconut(selectedRows);
        calculateTotal(selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: CartTableData[], changeRows: CartTableData[]) => {
        selectedItems.value = selectedRows;
        calculateTotalOriginPrice(selectedRows);
        calculateDisconut(selectedRows);
        calculateTotal(selectedRows);
    },
});

const cartStore = useCartStore();
const router = useRouter();

function goToCheckout() {
    if (selectedItems.value.length === 0) {
        alert("Bạn phải chọn ít nhất 1 sản phẩm để tiếp tục.");
        return;
    }
    cartStore.setSelectedItems(selectedItems.value);
    router.push('/checkout');
}

onMounted(() => {
    getCart();
});
</script>
