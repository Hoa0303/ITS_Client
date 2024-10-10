<template>
    <div class="mt-10 pt-10 px-60 bg-gray-100">
        <p class="text-center text-4xl text-blue-950 m-0">Popular Brands</p>
        <a-carousel :slidesToShow="6" :dots="false" arrows>
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
                <img :src="item.image"
                    class="w-full select-none h-32 object-contain cursor-pointer filter grayscale hover:filter-none" />
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