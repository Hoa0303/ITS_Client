<template>
    <div class="mt-10 pt-10 px-10 md:px-20 lg:px-40 xl:px-60 bg-gray-100">
        <p class="text-center text-4xl text-blue-950 m-0">{{ $t('Popular Brands') }}</p>
        <a-carousel :slidesToShow="6" :dots="false" arrows :responsive="responsiveSettings">
            <template #prevArrow>
                <div class="custom-slick-arrow select-none -left-3">
                    <left-circle-outlined />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow select-none -right-3">
                    <right-circle-outlined />
                </div>
            </template>
            <div v-for="(item, index) in brandsData" :key="index" class="h-32 px-5">
                <router-link :to="`/product?BrandIds=${item.id}`">
                    <img :src="item.image"
                        class="w-full select-none h-32 object-contain cursor-pointer filter grayscale hover:filter-none" />
                </router-link>
            </div>
        </a-carousel>
    </div>
</template>

<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from "vue";
import { useTableData } from "../../hooks/Data";
import { toImageLink } from "../../services/common.service";
import httpService from '../../services/http.service';
import { Brand_API } from '../../services/api_url';

const { brandsData, setBrandsData } = useTableData();
const data = ref([]);

const responsiveSettings = [
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 6,
        }
    },
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 4,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 0,
        settings: {
            slidesToShow: 1,
        }
    }
];

async function getAll() {
    try {
        const res = await httpService.get(Brand_API);
        const formattedData = res.map((item: any) => ({
            id: item.id,
            name: item.name,
            image: toImageLink(item.imgUrl),
        }));
        data.value = res.data;
        setBrandsData(formattedData);
    } catch (error) {
        console.error("Error fetching all products: ", error);
    }
}

onMounted(() => {
    getAll();
});
</script>

<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #3e3d3d;
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}
</style>
