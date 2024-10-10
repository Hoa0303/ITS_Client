<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        <div v-if="(products.length == 0)" class="">Not Found</div>
        <div v-for="(item, index) in products" :key="index">
            <router-link :to="{ name: 'Details', params: { id: item.id.toString() } }">
                <a-badge-ribbon :text="'-' + item.discount + '%'" color="red" placement="start">
                    <a-card class="relative rounded-lg overflow-hidden shadow-lg" :bodyStyle="{ padding: '1rem' }">
                        <img :src="item.imageUrl" class="w-full h-48 object-contain" />
                        <div class="p-4">
                            <p class="text-lg font-semibold mb-2 h-14">{{ item.name }}</p>
                            <div class="flex flex-wrap mb-4 justify-between">
                                <a-button size="small" class="bg-gray-200">{{ item.sizescreen }} inches</a-button>
                                <a-button size="small" class="bg-gray-200">{{ item.ram }} GB</a-button>
                                <a-button size="small" class="bg-gray-200">{{ item.rom }} GB</a-button>
                            </div>
                            <div class="flex items-baseline gap-2 mb-4">
                                <p class="text-xl font-bold text-red-500">{{ fomratVND(item.price - (item.price *
                                    (item.discount / 100))) }}</p>
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
    <div class="flex justify-center pb-4" v-if="(products.length > 0)">
        <a-button size="large" @click="addPageSize">
            Load more
        </a-button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { HeartOutlined } from '@ant-design/icons-vue';
import { useTableData } from "../../hooks/productData";
import productService from '../../services/product.service';
import { fomratVND, toImageLink } from "../../services/common.service";
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';

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

const pageSize = ref(4);
const searchKey = route.query.search;

function addPageSize() {
    pageSize.value += 2;
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
    if (searchKey) {
        params.append('search', searchKey.toString());
    }

    try {
        const res = await productService.filterProduct(params);
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

const debouncedFilterProduct = debounce(filterProduct, 900);

watch(
    () => [props.minprices, props.maxprices, props.selectedCategories, props.selectedBrands, props.selectedRams, props.sortData, pageSize.value, searchKey],
    () => {
        debouncedFilterProduct();
    }
);

filterProduct();
</script>
