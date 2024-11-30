<template>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 py-10 sm:px-6 md:px-8 lg:px-28 gap-9 ">
        <div class="lg:col-span-2 md:col-span-2 shadow-lg rounded-lg p-5 h-fit sticky top-24">
            <Card class="sticky top-24" />
        </div>

        <div class="lg:col-span-6 md:col-span-4 shadow-lg rounded-lg p-5 bg-white">
            <a-typography-title class="mb-4 text-gray-800">Favorite Products</a-typography-title>

            <div v-for="(item, index) in products" :key="index" class="border-t-2 relative p-3"
                @mouseenter="icon = true" @mouseleave="icon = false">

                <CloseOutlined v-if="icon" class="absolute top-11 right-0 text-red-500"
                    @click="deleteFavorite(item.id)" />

                <div class="grid grid-cols-4 gap-4 items-center">
                    <div class="col-span-3 flex items-center gap-5">
                        <div class="">
                            <img :width="200" :src="item.imageUrl" alt="Product Image" class="rounded-lg shadow-sm" />
                        </div>

                        <div class="">
                            <div class="text-gray-500 text-sm">{{ item.category }}</div>
                            <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                                <div class="text-gray-800 text-lg font-semibold hover:text-green-500 py-2">
                                    {{ item.name }}
                                </div>
                            </router-link>
                            <div class="text-gray-400 text-sm">Diagonal display:
                                <span class="text-gray-800">{{ item.sizescreen }} inches</span>
                            </div>
                            <div class="text-gray-400 text-sm">CPU:
                                <span class="text-gray-800">{{ item.cpu }}</span>
                            </div>
                            <div class="text-gray-500 text-sm">RAM:
                                <span class="text-gray-800">{{ item.ram }} GB</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1">
                        <div class="flex flex-col">
                            <div class="text-gray-400 text-sm line-through">{{ fomratVND(item.price) }}</div>
                            <div class="text-red-600 text-2xl font-semibold">
                                {{ fomratVND(item.price - (item.price * (item.discount / 100))) }}
                            </div>
                            <!-- <a-button type="primary" size="large" class="mt-2 block"
                                @click="addToCart(item.id, item.colorId)">ADD TO CART</a-button> -->
                            <a-button type="primary" size="large" class="mt-2 block">
                                <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                                    VIEW DETAILS
                                </router-link>
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import Card from '../../components/Personal/Card.vue';
import { useTableData } from '../../hooks/productData';
import { Cart_API, User_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { fomratVND, toImageLink } from '../../services/common.service';
import { message } from 'ant-design-vue';

const { products, setProduct } = useTableData();

const icon = ref(false);

async function getFavorite() {
    try {
        const res = await httpService.getWithAuth(User_API + '/favorite/products');
        const formattedData = res.items.map((item: any) => ({
            id: item.id,
            colorId: item.colorId,
            name: item.name,
            discount: item.discount,
            category: item.categoryName,
            brand: item.brandName,
            imageUrl: toImageLink(item.imageUrl),
            sizescreen: item.sizeScreen,
            ram: item.ram,
            rom: item.rom,
            cpu: item.cpu,
            price: item.price,
        }));
        setProduct(formattedData);
    }
    catch (error) {
        console.log(error);
    }
}

async function addToCart(productId: number, colorId: number) {
    try {
        const data = {
            productId: productId,
            colorId: colorId,
            quantity: 1,
        }
        const res = await httpService.postWithAuth(Cart_API, data);
        console.log(res);
        message.success('Item has been added to your shopping cart')
    }
    catch {
        message.error('Fail to added to your shopping cart');
    }
};

async function deleteFavorite(productId: number) {
    try {
        await httpService.delWithAuth(User_API + `/favorite/${productId}`);
        setProduct(products.value.filter(favId => favId.id !== productId));
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getFavorite();
})
</script>

<style scoped>
img:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

a-button:hover {
    background-color: #1d4ed8;
    transition: background-color 0.2s ease;
}
</style>