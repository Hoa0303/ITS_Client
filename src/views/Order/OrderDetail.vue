<template>
    <div>
        <div class="mb-3">
            <p class="text-xl mb-6">Delivery address</p>
            <p class="text-sm" >{{ oderDetailData?.receiver }} - {{ oderDetailData?.phoneNumber }}</p>
            <p class="text-sm" >{{ oderDetailData?.deliveryAddress }}</p>

        </div>
        <div class="">
            <p class="text-xl mb-6">Products</p>
            <div v-for="(item, index) in oderDetailData?.productOrderDetails" :key="index">
                <div class="grid grid-cols-3">
                    <div class="flex">
                        <img class="object-contain" :src="toImageLink(item.imageUrl)">
                    </div>
                    <div class="col-span-2 px-1">
                        <p class="mb-1 text-md">
                            <router-link :to="{ name: 'Details', params: { id: item.productId.toString() } }">
                                {{ item.productName }}
                            </router-link>
                        </p>
                        <p class="mb-1 text-sm text-gray-500 flex justify-between">
                            <span>Type: {{ item.colorName }} </span>
                            <span>Quantity: {{ item.quantity }}</span>
                        </p>
                        <p class="mb-1 text-sm">Origin Price: {{ fomratVND(item.originPrice) }} </p>
                        <p class="mb-1 text-sm">Total: {{ fomratVND(item.price) }} </p>
                    </div>
                </div>
                <a-divider class="bg-gray-100" style="height: 2px;" />
            </div>
            <div class="flex justify-between items-center">
                <p class="mx-5 text-xl font-semibold text-gray-400">Subtotal</p>
                <p class="text-lg font-semibold">{{ fomratVND(oderDetailData?.total!) }}</p>
            </div>
            <div class="flex justify-between items-center">
                <p class="mx-5 text-xl font-semibold text-gray-400">Amount paid</p>
                <p class="text-lg font-semibold">{{ fomratVND(oderDetailData?.amountPaid!) }}</p>
            </div>

        </div>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useTableData } from '../../hooks/OrderData';
import httpService from '../../services/http.service';
import { Order_API } from '../../services/api_url';
import { fomratVND, toImageLink } from '../../services/common.service';

const props = defineProps({
    orderId: { type: Number, default: '' },
});

const { oderDetailData, setOrderDetailData } = useTableData();

async function getDetail(id: number) {
    try {
        const res = await httpService.getWithAuth(Order_API + `/${id}`);
        setOrderDetailData(res);
        // console.log(oderDetailData.value);
    } catch (error) {
        console.error("Error");
    }
}

onMounted(() => {
    const id = props.orderId;
    getDetail(id);
});

watch(() => props.orderId, (newId) => {
    getDetail(newId);
});
</script>