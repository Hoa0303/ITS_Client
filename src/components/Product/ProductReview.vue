<template>
    <div class="lg:col-span-5 md:col-span-4 border-solid border-2 p-4 border-gray-50 rounded-md shadow-lg relative">
        <p>{{ $t('products.Review') }} {{ props.productName }}</p>
        <div>
            <div>
                <div class="flex items-center space-x-2">
                    <span class="text-3xl font-semibold text-yellow-500">{{ props.rating.toFixed(1) }}</span>
                    <span class="text-xl text-gray-500">out of 5</span>
                </div>

                <div class="flex items-end">
                    <a-rate class="text-yellow-500" :value="rating" allow-half disabled></a-rate>
                </div>
            </div>

            <div v-for="(item, index) in reviewData" :key="index">
                <a-comment>
                    <template #author><a>{{ item.fullName }}</a></template>
                    <template #avatar>
                        <a-avatar :src="item.imageUrl ? toImageLink(item.imageUrl) : null" />
                    </template>
                    <template #content>
                        <a-rate class="text-sm mb-2 text-yellow-500" :value="item.start" disabled></a-rate>
                        <div>{{ item.description }}</div>
                    </template>
                    <template #datetime>
                        <a-tooltip>
                            <span>{{ formatDate(item.createAt) }} | {{ formatTime(item.createAt) }}</span>
                        </a-tooltip>
                    </template>
                </a-comment>
            </div>
        </div>
        <a-pagination class="flex justify-end absolute bottom-5 right-5" :current="currentPage" :pageSize="pageSize"
            :total="totalItems" @change="onPageChange" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ReviewData, useTableData } from '../../hooks/Data';
import httpService from '../../services/http.service';
import { Product_API } from '../../services/api_url';
import { formatDate, formatTime, toImageLink } from '../../services/common.service';

const props = defineProps({
    productId: { type: Number, default: '' },
    rating: { type: Number, default: '' },
    ratingCount: { type: Number, default: '' },
    productName: { type: String, default: '' },
});

const { reviewData, setReviewData } = useTableData();

const currentPage = ref(1);
const pageSize = ref(2);
const totalItems = ref(0);

async function getReview(productId: number, page: number, pageSize: number) {
    try {
        const res = await httpService.getWithAuthPagination(Product_API + `/review/${productId}`, page, pageSize, '');
        if (res) {
            totalItems.value = res.totalItems;
            const formattedData = res.items.map((item: ReviewData) => ({
                id: item.id,
                description: item.description,
                start: item.start,
                imageUrl: item.imageUrl,
                fullName: item.fullName,
                createAt: item.createAt
            }));
            setReviewData(formattedData);
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

function onPageChange(page: number, size: number) {
    currentPage.value = page;
    pageSize.value = size;
    getReview(props.productId, currentPage.value, pageSize.value);
}

onMounted(() => {
    getReview(props.productId, currentPage.value, pageSize.value);
});
</script>