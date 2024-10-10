<template>
    <div class="py-10 sm:px-6 md:px-8 lg:px-28">
        <a-breadcrumb class="">
            <a-breadcrumb-item><router-link to="/">Home</router-link></a-breadcrumb-item>
            <a-breadcrumb-item><router-link to="/product">Product</router-link></a-breadcrumb-item>
            <a-breadcrumb-item>{{ productName }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />

        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
            <!-- Carousel -->
            <div class="md:col-span-3">
                <a-carousel autoplay dots-class="slick-dots slick-thumb" class="rounded-lg">
                    <template #customPaging="props">
                        <img :src="toImageLink(productsData[0]?.imageUrls[props.i])"
                            class="cursor-pointer h-12 w-12 object-cover rounded-lg border border-gray-300" />
                    </template>

                    <div v-for="(url, index) in productsData[0]?.imageUrls" :key="index" class="relative">
                        <img class="w-full h-96 object-contain" :src="toImageLink(url)" />
                    </div>
                </a-carousel>
            </div>

            <div class="md:col-span-2">
                <!-- Name -->
                <p class="text-lg"> {{ productsData[0]?.name }}</p>

                <!-- Version -->
                <p v-if="productsVersion.length > 1" class="pt-4">Version</p>
                <div v-if="productsVersion.length > 1" class="grid grid-cols-3 gap-3">
                    <router-link :to="`/product/${item.id}`" v-for="(item) in productsVersion" :key="item.id"
                        class="flex-col flex justify-center items-center gap-1 py-2 border-solid border border-gray-300 rounded-lg"
                        :class="{ 'bg-gray-200': selectedVersionId === item.id }" @click="setSelectedVersion(item.id)">
                        <div class="font-semibold text-xs">{{ item.version }}</div>
                        <div class="text-xs">{{ fomratVND(item.price) }}</div>
                    </router-link>
                </div>

                <!-- Colors -->
                <p class="pt-4">Colors</p>
                <div class="grid grid-cols-3 gap-3">
                    <div v-for="(item, index) in productsData[0]?.color" :key="index" @click="selectColor(index)">
                        <div class="flex items-center border-solid border-[1.5px] border-gray-300 rounded-lg cursor-pointer py-1"
                            :class="{ 'bg-gray-200': selectedColorIndex === index }">
                            <img :src="toImageLink(item.imageUrl)" class="size-10">
                            <span>
                                <p class="m-1 font-semibold text-[0.7rem]">{{ colorNames[index] }}</p>
                                <p class="m-1 text-[0.6rem]">{{ fomratVND(item.prices) }}</p>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Prices -->
                <div class="flex items-baseline gap-2 pt-4">
                    <p class="text-xl font-bold text-red-500">{{ fomratVND(selectedPrice - selectedPrice *
                        (productsData[0]?.discount / 100)) }}</p>
                    <p class="line-through text-gray-500">{{ fomratVND(selectedPrice) }}</p>
                </div>

                <!-- Button -->
                <div class="grid grid-cols-6 gap-3">
                    <div
                        class="col-span-5 bg-red-500 text-white flex-col flex justify-center items-center rounded-lg cursor-pointer py-1">
                        <p class="m-1">Shop now</p>
                    </div>
                    <div class="flex-col flex justify-center items-center border-solid border-2 border-red-500 rounded-lg cursor-pointer py-1 min-w-[100px]"
                        @click="addToCart">
                        <p class="m-1 text-red-500">
                            <ShoppingCartOutlined />
                        </p>
                        <p class="m-1 text-red-500 text-xs">Add to cart</p>
                    </div>
                </div>
            </div>
        </div>

        <a-divider class="bg-gray-100 border-gray-100" style="height: 2px;" />

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
            <!-- Rate & Comment -->
            <div class="lg:col-span-5 md:col-span-4 border-solid border-2 p-4 border-gray-50 rounded-md shadow-lg">
                Đánh giá nhận xét
            </div>

            <!-- Specifications -->
            <div
                class="lg:col-span-2 md:col-span-3 border-solid border-2 p-4 border-gray-50 rounded-md shadow-lg flex flex-col h-full">
                <p>Specifications</p>

                <div class="border-solid border-2 p-4 border-gray-50 rounded-md shadow-lg flex-grow overflow-y-auto">
                    <a-table :columns="columns" :data-source="screen" :showHeader="false" :pagination='false'>
                        <template #bodyCell="{ column, text }">
                            <template v-if="column.dataIndex === 'name'">
                                <a>{{ text }}</a>
                            </template>
                        </template>
                    </a-table>
                </div>

                <div class="py-4 flex justify-center">
                    <a-button class="w-full" @click="showModal">View more</a-button>
                    <a-modal v-model:open="open" title="Specifications" footer=''>
                        <div class="modal-body">
                            <div class="border-solid border-2 p-4 my-5 border-gray-50 rounded-md shadow-lg">
                                <a-table :columns="columns" :data-source="screen" :showHeader="false"
                                    :pagination='false'>
                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'name'">
                                            <a>{{ text }}</a>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                            <div class="border-solid border-2 p-4 my-5 border-gray-50 rounded-md shadow-lg">
                                <a-table :columns="columns" :data-source="camera" :showHeader="false"
                                    :pagination='false'>
                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'name'">
                                            <a>{{ text }}</a>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                            <div class="border-solid border-2 p-4 my-5 border-gray-50 rounded-md shadow-lg">
                                <a-table :columns="columns" :data-source="specifications" :showHeader="false"
                                    :pagination='false'>
                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'name'">
                                            <a>{{ text }}</a>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                            <div class="border-solid border-2 p-4 my-5 border-gray-50 rounded-md shadow-lg">
                                <a-table :columns="columns" :data-source="battery" :showHeader="false"
                                    :pagination='false'>
                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'name'">
                                            <a>{{ text }}</a>
                                        </template>
                                    </template>
                                </a-table>
                            </div>

                            <div class="border-solid border-2 p-4 my-5 border-gray-50 rounded-md shadow-lg">
                                <a-table :columns="columns" :data-source="design" :showHeader="false"
                                    :pagination='false'>
                                    <template #bodyCell="{ column, text }">
                                        <template v-if="column.dataIndex === 'name'">
                                            <a>{{ text }}</a>
                                        </template>
                                    </template>
                                </a-table>
                            </div>
                        </div>
                    </a-modal>
                </div>
            </div>
        </div>

    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';
import { ProductsData, useTableData } from "../../hooks/productData";
import { fomratVND, toImageLink } from '../../services/common.service';
import httpService from '../../services/http.service';
import { Cart_API, Color_API, Product_API } from '../../services/api_url';
import productService from '../../services/product.service';

interface Props {
    id: string;
}

const props = defineProps<Props>();
const { productsData, setProductData } = useTableData();
const { productsVersion, setProductVersion } = useTableData();

const productName = ref('');
const selectedVersionId = ref<number | null>(null);
const colorNames = ref<string[]>([]);

// Biến để lưu màu được chọn và giá tương ứng
const selectedColorIndex = ref(0);
const selectedPrice = ref<number>(0);

const open = ref<boolean>(false);
const showModal = () => {
    open.value = true;
};

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Detail',
        dataIndex: 'detail',
    },
];

const screen = ref([
    { key: '1', name: 'Screen size', detail: '' },
    { key: '2', name: 'Display technology', detail: '' },
    { key: '3', name: 'Scanning frequency', detail: '' },
]);

const camera = ref([
    { key: '1', name: 'Rear camera', detail: '' },
    { key: '2', name: 'Front camera', detail: '' },
]);

const specifications = ref([
    { key: '1', name: 'CPU', detail: '' },
    { key: '2', name: 'GPU', detail: '' },
    { key: '3', name: 'Ram', detail: '' },
    { key: '4', name: 'Rom', detail: '' },
]);

const battery = ref([
    { key: '1', name: 'Battery', detail: '' },
]);

const design = ref([
    { key: '1', name: 'Size', detail: '' },
    { key: '2', name: 'Weight', detail: '' },
]);

async function getProduct(id: number) {
    try {
        const res = await httpService.get(Product_API + `/${id}`);
        if (res) {
            const product: ProductsData = res;
            productName.value = product.name;
            setProductData([product]);

            screen.value = [
                { key: '1', name: 'Screen size', detail: product.sizeScreen + ' inches' },
                { key: '2', name: 'Display technology', detail: product.material },
                { key: '3', name: 'Scanning frequency', detail: product.scanHz + ' Hz' },
            ];

            camera.value = [
                { key: '1', name: 'Rear camera', detail: product.rearCam },
                { key: '2', name: 'Front camera', detail: product.frontCam },
            ];

            specifications.value = [
                { key: '1', name: 'CPU', detail: product.cpu },
                { key: '2', name: 'GPU', detail: product.gpu },
                { key: '3', name: 'Ram', detail: product.ram + ' GB' },
                { key: '4', name: 'Rom', detail: product.rom === 1 ? '1 TB' : product.rom + ' GB' },
            ];

            battery.value = [
                { key: '1', name: 'Battery', detail: product.battery },
            ];

            design.value = [
                { key: '1', name: 'Size', detail: product.size },
                { key: '2', name: 'Weight', detail: product.weight + 'g' },
            ];
            updatePrice();
        } else {
            console.error("No product data found for ID:", id);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

async function getColor(id: number) {
    const res = await httpService.get(Color_API + `/${id}`);
    return res.name;
}

async function getVersion(searchkey: any) {
    const data = {
        request: searchkey
    }
    const res = await productService.getVersion(data);
    const formattedData = res.data.map((item: any) => ({
        id: item.id,
        version: item.version,
        enable: item.enable,
        price: item.price
    }));
    setProductVersion(formattedData);
}

function setSelectedVersion(id: number) {
    selectedVersionId.value = id;
}

function selectColor(index: number) {
    selectedColorIndex.value = index;
    updatePrice();
}

function updatePrice() {
    if (productsData.value && productsData.value[0]?.color) {
        const selectedColor = productsData.value[0].color[selectedColorIndex.value];
        if (selectedColor) {
            selectedPrice.value = selectedColor.prices;
        }
    }
}

async function addToCart() {
    try {
        const data = {
            productId: productsData.value[0]?.id,
            colorId: productsData.value[0].color[selectedColorIndex.value].colorId,
            quantity: 1,
        }
        const res = await httpService.postWithAuth(Cart_API, data);
        console.log(res);
    }
    catch {
        console.error('Error:');
    }
};


onMounted(async () => {
    const id = parseInt(props.id);
    await getProduct(id);

    const colors = productsData.value[0]?.color;
    if (colors) {
        const names = await Promise.all(colors.map((item: any) => getColor(item.colorId)));
        colorNames.value = names;
    }
    selectedVersionId.value = parseInt(props.id);
    getVersion(productsData.value[0]?.line);
});

watch(
    () => props.id,
    async (id) => {
        if (id) {
            await getProduct(parseInt(id));
            selectedVersionId.value = parseInt(id);
        }
    }
);

</script>

<style scoped>
:deep(.slick-dots) {
    position: relative;
    height: auto;
}

:deep(.slick-slide img) {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    max-width: 80%;
}

:deep(.slick-arrow) {
    display: none !important;
}

:deep(.slick-thumb) {
    bottom: 0px;
}

:deep(.slick-thumb li) {
    width: 60px;
    height: 45px;
}

:deep(.slick-thumb li img) {
    width: 100%;
    height: 100%;
    display: block;
}

:deep(.slick-thumb li.slick-active) {
    width: fit-content;
}

.modal-body {
    max-height: 400px;
    overflow-y: auto;
}
</style>