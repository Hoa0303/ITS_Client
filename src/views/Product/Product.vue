<template>
    <div class="grid xl:grid-cols-5 lg:grid-cols-1 gap-2">

        <div class="p-6 px-4 h-fit">
            <div class="mb-6">
                <p class="text-lg font-semibold mb-4">{{ $t('products.Price') }}</p>
                <a-input-group compact>
                    <a-input v-model:value="minprices" size="large" style="width: 100px; text-align: center"
                        placeholder="Minimum" />
                    <!-- <a-input-number v-model:value="minprices" size="large" style="width: 100px; text-align: center"
                        :min="0" placeholder="Minimum"
                        :formatter="(value: any) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')" /> -->
                    <a-input size="large" class="site-input-split"
                        style="width: 30px; border-left: 0; pointer-events: none" placeholder="~" disabled />
                    <!-- <a-input-number v-model:value="maxprices" size="large" style="width: 100px; text-align: center"
                        :min="0" placeholder="Maximum"
                        :formatter="(value: any) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')" /> -->
                    <a-input v-model:value="maxprices" size="large" class="site-input-right"
                        style="width: 100px; text-align: center" placeholder="Maximum" />
                </a-input-group>
            </div>

            <div class="mb-6">
                <p class="text-lg font-semibold mb-4">{{ $t('products.Categories') }}</p>
                <a-checkbox-group v-model:value="selectedCategories" class="xl:grid grid-cols-2 gap-4">
                    <a-checkbox v-for="(item, index) in categoriesData" :key="index" :value="item.id">
                        {{ item.name }}
                    </a-checkbox>
                </a-checkbox-group>
            </div>

            <div class="mb-6">
                <p class="text-lg font-semibold mb-4">{{ $t('products.Brands') }}</p>
                <a-checkbox-group v-model:value="selectedBrands" class="xl:grid grid-cols-2 gap-4">
                    <a-checkbox v-for="(item, index) in brandsData" :key="index" :value="item.id">
                        {{ item.name }}
                    </a-checkbox>
                </a-checkbox-group>
            </div>

            <div>
                <p class="text-lg font-semibold mb-4">Ram</p>
                <a-checkbox-group v-model:value="selectedRams" class="xl:grid grid-cols-2 gap-4">
                    <a-checkbox v-for="item in [4, 6, 8, 16, 32, 64]" :key="item" :value="item">
                        {{ item }} GB
                    </a-checkbox>
                </a-checkbox-group>
            </div>
        </div>

        <div class="col-span-4 px-4">
            <div class="flex items-center justify-end">
                <div class="p-3 rounded-xl flex items-center">
                    <span class="mr-2">Sort:</span>
                    <a-select class="z-10" v-model:value="sortData" size="large" style="width: 200px" :options="options"
                        :getPopupContainer="getPopupContainer" />
                </div>
            </div>

            <ProductList :minprices="minprices" :maxprices="maxprices" :selectedCategories="selectedCategories"
                :selectedBrands="selectedBrands" :selectedRams="selectedRams" :sortData="sortData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import type { SelectProps } from 'ant-design-vue';
import ProductList from '../../components/Product/ProductList.vue';
import httpService from '../../services/http.service';
import { Brand_API, Category_API } from '../../services/api_url';
import { useTableData } from '../../hooks/Data';
import { toImageLink } from '../../services/common.service';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const getPopupContainer = (triggerNode: any) => triggerNode.parentNode

const minprices = ref<string>('');
const maxprices = ref<string>('');

const { t } = useI18n();
const sortData = ref('0');
const options = ref<SelectProps['options']>([
    { value: '0', label: t('products.Default') },
    { value: '1', label: t('products.LowtoHigh') },
    { value: '2', label: t('products.HightoLow') },
]);

const selectedCategories = ref<number[]>([]);
const selectedBrands = ref<number[]>([]);
const selectedRams = ref<number[]>([]);

const { brandsData, setBrandsData } = useTableData();
const { categoriesData, setcategoriesData } = useTableData();

const router = useRouter();
const route = useRoute();


const updateURL = () => {
    const query: any = {
        ...route.query,
        Sorter: sortData.value === '0' ? undefined : sortData.value,
        MinPrice: minprices.value || undefined,
        MaxPrice: maxprices.value || undefined,
        CategoryIds: selectedCategories.value.length > 0 ? selectedCategories.value : undefined,
        BrandIds: selectedBrands.value.length > 0 ? selectedBrands.value : undefined,
        Ram: selectedRams.value.length > 0 ? selectedRams.value : undefined,
    };

    Object.keys(query).forEach(key => {
        if (query[key] === undefined) {
            delete query[key];
        }
    });

    router.push({ query });
};

watch(sortData, updateURL);
watch(minprices, updateURL);
watch(maxprices, updateURL);
watch(selectedCategories, updateURL);
watch(selectedBrands, updateURL);
watch(selectedRams, updateURL);

async function getBrands() {
    try {
        const res = await httpService.get(Brand_API);
        const formattedData = res.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: toImageLink(item.imgUrl),
        }));
        setBrandsData(formattedData);
    } catch (error) {
        console.error("Error fetching brands:", error);
    }
}

async function getCategory() {
    try {
        const res = await httpService.get(Category_API);
        const formattedData = res.map((item: any) => ({
            id: item.id,
            name: item.name
        }));
        setcategoriesData(formattedData);
    } catch (error) {
        console.log("Error fetching categories:", error);
    }
}

onMounted(() => {
    getBrands();
    getCategory();

    if (route.query.MinPrice) {
        minprices.value = route.query.MinPrice as string;
    }
    if (route.query.MaxPrice) {
        maxprices.value = route.query.MaxPrice as string;
    }
    if (route.query.CategoryIds) {
        selectedCategories.value = (Array.isArray(route.query.CategoryIds) ? route.query.CategoryIds : [route.query.CategoryIds]).map(Number);
    }
    if (route.query.BrandIds) {
        selectedBrands.value = (Array.isArray(route.query.BrandIds) ? route.query.BrandIds : [route.query.BrandIds]).map(Number);
    }
    if (route.query.Ram) {
        selectedRams.value = (Array.isArray(route.query.Ram) ? route.query.Ram : [route.query.Ram]).map(Number);
    }
    if (route.query.Sorter) {
        sortData.value = route.query.Sorter as string;
    }
});

</script>
