<template>
    <div class="pt-10">
        <p class="text-center text-4xl text-blue-950">{{ $t('Trending Products') }}</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:px-52 ">
            <div v-for="(item, index) in products" :key="index">
                <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                    <a-badge-ribbon :text="'-' + item.discount + '%'" color="red">
                        <a-card class="rounded-lg overflow-hidden shadow-lg" :bodyStyle="{ padding: '1rem' }">
                            <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                                <img :src="item.imageUrl" class="w-full h-48 object-contain" />
                            </router-link>

                            <div class="p-4">
                                <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                                    <div class="text-lg font-semibold mb-2 h-14 hover:text-green-500 line-clamp-2">{{
                                        item.name
                                        }}</div>
                                </router-link>

                                <div class="flex flex-wrap mb-2 justify-start">
                                    <a-tag class="my-1" color="cyan">{{ item.sizescreen }} inches</a-tag>
                                    <a-tag class="my-1" color="blue">{{ item.ram }} GB</a-tag>
                                    <a-tag class="my-1" color="purple">
                                        {{ item.rom === 1 ? '1TB' : item.rom + 'GB' }}
                                    </a-tag>
                                </div>

                                <div class="flex-col items-baseline gap-2 mb-2">
                                    <div class="text-xl font-bold text-red-500">{{ fomratVND(item.price - (item.price *
                                        (item.discount / 100))) }}</div>
                                    <div class="line-through text-gray-500">{{ fomratVND(item.price) }}</div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <a-rate :value="item.rating" class="text-yellow-500" disabled allow-half />
                                </div>
                            </div>
                        </a-card>
                    </a-badge-ribbon>
                </router-link>
            </div>
        </div>
        <router-link to="/product" class="py-5 flex items-center justify-center text-md text-gray-400">
            {{ $t('shop-all') }}
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useTableData } from "../../hooks/productData";
import { fomratVND, toImageLink } from "../../services/common.service";
import httpService from "../../services/http.service";
import { Product_API } from "../../services/api_url";

const { products, setProduct } = useTableData();

async function getAll() {
    try {
        const res = await httpService.getWithAuthPagination(Product_API + '/descending-by sold', 1, 4, '');
        const formattedData = res.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            discount: item.discount,
            category: item.categoryName,
            brand: item.brandName,
            imageUrl: toImageLink(item.imageUrl),
            sizescreen: item.sizeScreen,
            rating: item.rating,
            ram: item.ram,
            rom: item.rom,
            price: item.price,
            sold: item.sold,
        }));
        setProduct(formattedData);
    } catch (error) {
        console.error("Error filtering products: ", error);
    }
}

onMounted(() => {
    getAll();
});
</script>

<style scoped>
img:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>