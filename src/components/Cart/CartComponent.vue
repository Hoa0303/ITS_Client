<template>
    <div>
        <div v-for="(item, index) in cartData" :key="index" class="relative" @mouseenter="item.showIcon = true"
            @mouseleave="item.showIcon = false">
            <button v-if="item.showIcon" class="absolute right-0 text-red-300" @click="delCart(item.id)">
                <CloseOutlined />
            </button>
            <div class="grid grid-cols-3">
                <div class="flex">
                    <img class="object-contain" :src="toImageLink(item.imageUrl)">
                </div>
                <div class="col-span-2 px-1">
                    <p class="mb-1 text-gray-400">{{ item.categoryName }}</p>
                    <p class="mb-1 text-lg">
                        {{ item.productName }}
                        {{ item.rom === 1 ? '1TB' : item.rom + 'GB' }} -
                        {{ item.colorName }}
                    </p>
                    <p class="mb-1 text-sm">{{ fomratVND(item.quantity * item.price) }}
                        <span class="text-gray-400">
                            {{ item.quantity }} x {{ fomratVND(item.price) }}
                        </span>
                    </p>
                </div>
            </div>

            <a-divider class="bg-gray-100" style="height: 2px;" />
        </div>
    </div>

    <div class="flex justify-between items-center">
        <p class="mx-5 text-xl font-semibold text-gray-400">{{ $t('cart.Subtotal') }}</p>
        <p class="text-lg font-semibold">{{ fomratVND(total) }}</p>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CloseOutlined } from '@ant-design/icons-vue';
import httpService from "../../services/http.service";
import { Cart_API } from "../../services/api_url";
import { CartTableData, useTableData } from "../../hooks/Data";
import { fomratVND, toImageLink } from "../../services/common.service";

const emit = defineEmits(['updateCart']);
const { cartData, setCartData } = useTableData();
const total = ref(0);

function calculateTotal(items: CartTableData[]) {
    total.value = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.price;
        return acc + itemTotal;
    }, 0);
}

function getCart() {
    httpService.getWithAuth(Cart_API)
        .then(data => {
            const formData = data.map((item: CartTableData) => ({
                ...item,
                showIcon: false,
            }));
            setCartData(formData);
            calculateTotal(formData);
            emit('updateCart', formData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function delCart(id: string) {
    try {
        console.log("Delete cart with id:", id);
        await httpService.delWithAuth(Cart_API + `/${id}`);
        setCartData(cartData.value.filter(cart => cart.id !== id))
        calculateTotal(cartData.value);
    } catch (error) {
        console.error("Error deleting cart:", error);
    }
}

onMounted(() => {
    getCart();
});

defineExpose({
    getCart,
});
</script>