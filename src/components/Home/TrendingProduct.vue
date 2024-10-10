<template>
    <div class="pt-10">
        <p class="text-center text-4xl text-blue-950">Trending Products</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-9 px-52">
            <div v-for="(item, index) in products" :key="index" class="">
                <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                    <a-badge-ribbon :text="'-' + item.discount + '%'" color="red">
                        <a-card class="relative rounded-lg overflow-hidden shadow-lg" :bodyStyle="{ padding: '1rem' }">
                            <img :src="item.imageUrl" class="w-full h-48 object-contain" />
                            <div class="p-4">
                                <p class="text-lg font-semibold mb-2 h-14">{{ item.name }}</p>
                                <div class="flex flex-wrap mb-4 justify-between">
                                    <a-button size="small" class="bg-gray-200">{{ item.sizescreen }} inches</a-button>
                                    <a-button size="small" class="bg-gray-200">{{ item.ram }} GB</a-button>
                                    <a-button size="small" class="bg-gray-200">{{ item.rom }} GB</a-button>
                                </div>
                                <div class="flex items-baseline gap-2 mb-4 ">
                                    <p class="text-xl font-bold text-red-500">{{ fomratVND(item.price -
                                        (item.price * (item.discount / 100))) }}</p>
                                    <p class="line-through text-gray-500">{{ fomratVND(item.price) }}</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <a-rate :value="5" class="text-yellow-500" disabled />
                                    <HeartOutlined class="text-red-500 text-xl" />
                                </div>
                            </div>
                        </a-card>
                    </a-badge-ribbon>
                </router-link>
            </div>
        </div>
        <router-link to="/product" class="flex items-center justify-center text-[14px] text-gray-400">SHOP ALL
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { HeartOutlined } from '@ant-design/icons-vue';
import { useTableData } from "../../hooks/productData";
import productService from '../../services/product.service';
import { fomratVND, toImageLink } from "../../services/common.service";

const { products, setProduct } = useTableData();

async function getAll() {
    try {
        const res = await productService.getAll(1, 4, '');
        const formattedData = res.data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            discount: item.discount,
            category: item.categoryName,
            brand: item.brandName,
            imageUrl: toImageLink(item.imageUrl),
            sizescreen: item.sizeScreen,
            ram: item.ram,
            rom: item.rom,
            price: item.price,
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