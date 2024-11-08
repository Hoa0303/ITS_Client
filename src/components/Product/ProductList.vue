<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        <div v-if="(products.length == 0)" class="">Not Found</div>
        <div v-for="(item, index) in products" :key="index">
            <a-badge-ribbon :text="'-' + item.discount + '%'" color="red" placement="start">
                <a-card class="relative rounded-lg overflow-hidden shadow-lg" :bodyStyle="{ padding: '1rem' }">
                    <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                        <img :src="item.imageUrl" class="w-full h-48 object-contain" />
                    </router-link>

                    <div class="p-4">
                        <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                            <div class="text-lg font-semibold mb-2 h-14 hover:text-green-500 line-clamp-2">{{ item.name
                                }}</div>
                        </router-link>

                        <div class="flex flex-wrap mb-2 justify-start">
                            <a-tag class="my-1" color="cyan">{{ item.sizescreen }} inches</a-tag>
                            <a-tag class="my-1" color="blue">{{ item.ram }} GB</a-tag>
                            <a-tag class="my-1" color="purple">
                                {{ item.rom === 1 ? '1TB' : item.rom + 'GB' }}
                            </a-tag>
                        </div>

                        <div class="flex items-baseline gap-2 mb-2">
                            <div class="text-xl font-bold text-red-500">{{ fomratVND(item.price - (item.price *
                                (item.discount / 100))) }}</div>
                            <div class="line-through text-gray-500">{{ fomratVND(item.price) }}</div>
                        </div>

                        <div class="flex items-center justify-between">
                            <a-rate :value="item.rating" class="text-yellow-500" disabled allow-half />
                            <component :is="isFavorite(item.id) ? HeartFilled : HeartOutlined"
                                @click="editFavorite(item.id)" :style="{ color: isFavorite(item.id) ? 'red' : 'gray' }"
                                class="text-xl select-none" />
                        </div>
                    </div>
                </a-card>
            </a-badge-ribbon>
        </div>
    </div>
    <div class="flex justify-center pb-4" v-if="(products.length > 0 && pageSize < totalItems)">
        <a-button size="large" @click="addPageSize">
            Load more
        </a-button>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { HeartOutlined, HeartFilled } from '@ant-design/icons-vue';
import { useTableData } from "../../hooks/productData";
import productService from '../../services/product.service';
import { fomratVND, toImageLink } from "../../services/common.service";
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';
import httpService from "../../services/http.service";
import { User_API } from "../../services/api_url";

const { products, setProduct } = useTableData();
const props = defineProps({
    minprices: { type: String, default: '' },
    maxprices: { type: String, default: '' },
    sortData: { type: String, default: '' },
    selectedCategories: { type: Array, default: () => [] },
    selectedBrands: { type: Array, default: () => [] },
    selectedRams: { type: Array, default: () => [] },
});

const route = useRoute();
const pageSize = ref(8);
const totalItems = ref();
const searchKey = computed(() => route.query.search || '');
const favoriteProducts = ref<number[]>([]);

function addPageSize() {
    pageSize.value += 4;
}

async function filterProduct() {
    const params = new URLSearchParams();

    const categoryIds = props.selectedCategories as (string | number)[];
    const brandIds = props.selectedBrands as (string | number)[];
    const ram = props.selectedRams as (string | number)[];
    const minPrice = props.minprices || '';
    const maxPrice = props.maxprices || '';
    const sortData = props.sortData || '';

    categoryIds.forEach(id => params.append('CategoryIds', id.toString()));
    brandIds.forEach(id => params.append('BrandIds', id.toString()));
    ram.forEach(id => params.append('Ram', id.toString()));
    if (minPrice) {
        params.append('MinPrice', minPrice);
    }
    if (maxPrice) {
        params.append('MaxPrice', maxPrice);
    }
    if (sortData) {
        params.append('Sorter', sortData);
    }
    if (pageSize) {
        params.append('pageSize', pageSize.value.toString());
    }
    const searchValue = typeof searchKey.value === 'string' ? searchKey.value : JSON.stringify(searchKey.value);
    if (searchValue) {
        params.append('search', searchValue);
    }
    try {
        const res = await productService.filterProduct(params);
        totalItems.value = res.data.totalItems

        const formattedData = res.data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            discount: item.discount,
            category: item.categoryName,
            brand: item.brandName,
            rating: item.rating,
            imageUrl: toImageLink(item.imageUrl),
            sizescreen: item.sizeScreen,
            ram: item.ram,
            rom: item.rom,
            price: item.price,
        }));
        setProduct(formattedData);
        // console.log(searchKey.value);
        // console.log(products.value);        
    } catch (error) {
        console.error("Error filtering products: ", error);
    }
}

async function editFavorite(id: number) {
    try {
        if (isFavorite(id)) {
            const res = await httpService.delWithAuth(User_API + `/favorite/${id}`);
            favoriteProducts.value = favoriteProducts.value.filter(favId => favId !== id)
        } else {
            const res = await httpService.postWithAuth(User_API + '/favorite', { id: id });
            favoriteProducts.value.push(id);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getFavorite() {
    try {
        const res = await httpService.getWithAuth(User_API + '/favorite');
        favoriteProducts.value = res.map((item: any) => item);
    }
    catch (error) {
        console.log(error)
    }
}

function isFavorite(id: number): boolean {
    return favoriteProducts.value.includes(id);
}

onMounted(() => {
    getFavorite();
})

const debouncedFilterProduct = debounce(filterProduct, 550);

watch(
    () => [props.minprices, props.maxprices, props.selectedCategories, props.selectedBrands, props.selectedRams, props.sortData, pageSize.value, searchKey.value],
    () => {
        debouncedFilterProduct();
    }
);

filterProduct();
</script>

<style scoped>
img:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>