<template>
    <div v-for="(item, index) in orders" class="border-b-2" :key="index">
        <div class="flex items-center justify-between">
            <div class="flex items-end my-4 mx-4">
                <span class="text-3xl">#{{ item.id }}
                    <span class="text-gray-500 text-sm">from {{ item.orderDate }} - {{ item.orderTime }}</span>
                </span>
            </div>
            <div class="flex items-end my-4 mx-4 gap-5">
                <span class="flex items-center">
                    <span>{{ $t('order.status') }}:</span>
                    <a-tag class="p-1 m-2" :color="statusStyles1[item.orderStatus]">
                        {{ $t('order.' + OrderSatus[item.orderStatus]) }}
                    </a-tag>
                </span>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 my-4 mx-4">
            <div>{{ $t('order.paymentMethod') }}</div>
            <div>{{ item.paymentMethod }}</div>
        </div>

        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />
        <div class="grid grid-cols-2 gap-4 my-4 mx-4">
            <div>{{ $t('order.total') }}</div>
            <div>{{ fomratVND(item.total) }}</div>
        </div>
        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />
        <div class="grid grid-cols-2 gap-4 my-4 mx-4">
            <div>{{ $t('order.amountPaid') }}</div>
            <div>{{ fomratVND(item.amountPaid) }}</div>
        </div>
        <div class="flex items-end justify-end my-5 mx-4 gap-5">
            <a-button size="large" @click="showDrawer(item.id)">{{ $t('order.viewDetail') }}</a-button>

            <a-popconfirm title="Are you sure delete this order?" ok-text="Yes" cancel-text="No"
                @confirm="cacelOrder(item.id)">
                <a-button
                    v-if="OrderSatus[item.orderStatus] == 'Processing' || OrderSatus[item.orderStatus] == 'Confirmed'"
                    danger size="large">
                    {{ $t('order.cancelOrder') }}
                </a-button>
            </a-popconfirm>

            <a-popconfirm title="Confirmation of receipt of items" ok-text="Yes" cancel-text="No"
                @confirm="receivedOrder(item.id)">
                <a-button v-if="OrderSatus[item.orderStatus] == 'Shipping'" size="large"
                    class="border-orange-500 text-orange-500">
                    {{ $t('order.received') }}
                </a-button>
            </a-popconfirm>

            <a-button v-if="!item.reviewed && OrderSatus[item.orderStatus] == 'Received'"
                class="border-orange-500 text-orange-500" size="large" @click="showModal(item.id)">
                {{ $t('order.review') }}
            </a-button>

            <a-button v-if="item.payBackUrl != null" size="large" @click="redirectToPayBack(item.payBackUrl)">
                {{ $t('order.repayment') }}
            </a-button>
            <a-statistic-countdown v-if="item.payBackUrl != null" title="Countdown" :value="item.deadline"
                style="margin-right: 50px" />
        </div>
    </div>

    <a-spin v-if="pageSize < totalItems" tip="Loading...">
        <InfiniteLoading @infinite="load" />
    </a-spin>

    <a-drawer v-model:open="open" :closable="false" title="Order Detail">
        <OrderDetail :orderId="selectedOrderId" />
    </a-drawer>

    <a-modal class="my-2" v-model:open="modalReview" :title="'Review order #' + selectedOrderId" :centered="true"
        :closable="false" :footer="null" :maskClosable="false">
        <OrderReview :orderId="selectedOrderId" @close="modalReview = false" />
    </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { Order_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { OrderData, useTableData, OrderSatus } from '../../hooks/OrderData';
import { fomratVND, formatDate, formatTime, getPaymentDeadline } from '../../services/common.service';
import OrderDetail from '../../views/Order/OrderDetail.vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import InfiniteLoading from "v3-infinite-loading";
import OrderReview from '../../views/Order/OrderReview.vue';

const props = defineProps<{ activeKey: number }>();

const open = ref<boolean>(false);
const modalReview = ref(false);

const pageSize = ref(4);
const totalItems = ref(0);

const selectedOrderId = ref();

const showDrawer = (orderId: number) => {
    selectedOrderId.value = orderId;
    open.value = true;
};

const showModal = (orderId: number) => {
    selectedOrderId.value = orderId;
    modalReview.value = true;
}

const load = async ($state: any) => {
    try {
        pageSize.value += 4;
        await getOrderByUserId(pageSize.value);
        $state.loaded();
    } catch (error) {
        console.error('Failed to load more data:', error);
        $state.complete();
    }
};

const { orders, setOrder } = useTableData();

const statusStyles1: { [key: number]: string } = {
    0: 'gold',
    1: 'green',
    2: 'blue',
    3: 'purple',
    4: 'orange',
    5: 'red',
};

async function getOrderByUserId(size: number) {
    try {
        const res = await httpService.getWithAuthPagination(Order_API + '/user', 1, size, '');
        const formData = res.items.map((item: OrderData) => ({
            id: item.id,
            total: item.total,
            amountPaid: item.amountPaid,
            orderDate: formatDate(item.orderDate),
            orderTime: formatTime(item.orderDate),
            reviewed: item.reviewed,
            paymentMethod: item.paymentMethod,
            orderStatus: item.orderStatus,
            payBackUrl: item.payBackUrl,
            deadline: getPaymentDeadline(item.orderDate)
        }));
        // console.log(res);        
        totalItems.value = res.totalItems;
        setOrder(formData);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

async function getUserOrderWithStatus(status: number, size: number) {
    try {
        const res = await httpService.getWithAuthPagination(Order_API + `/user/${status}`, 1, size, '');
        const formData = res.items.map((item: OrderData) => ({
            id: item.id,
            total: item.total,
            amountPaid: item.amountPaid,
            orderDate: formatDate(item.orderDate),
            orderTime: formatTime(item.orderDate),
            reviewed: item.reviewed,
            paymentMethod: item.paymentMethod,
            orderStatus: item.orderStatus,
            payBackUrl: item.payBackUrl,
            deadline: getPaymentDeadline(item.orderDate)
        }));
        totalItems.value = res.totalItems;
        setOrder(formData);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

const router = useRouter();
function redirectToPayBack(payBackUrl: string) {
    // router.replace(payBackUrl);
    window.location.replace(payBackUrl);
}

async function cacelOrder(id: number) {
    try {
        await httpService.delWithAuth(Order_API + `/${id}`);
        const updatedOrders = orders.value.map(order => {
            if (order.id === id) {
                return { ...order, orderStatus: 5 };
            }
            return order;
        });
        setOrder(updatedOrders);
        message.success('Order have been cancel')
    }
    catch {
        message.error('Fail to cancel to your order. Please try again!');
    }
}

async function receivedOrder(orderId: number) {
    try {
        await message.loading('Updating status...', 2);
        await httpService.putWithAuth(Order_API + `/received/${orderId}`, orderId);
        const orderToUpdate = orders.value.find(order => order.id === orderId);
        if (orderToUpdate) {
            orderToUpdate.orderStatus += 1;
        }
        message.success("Update status successfully", 2);
    }
    catch {
        message.error("Fail to update order: ", orderId);
    }
}

onMounted(() => {
    const status = props.activeKey;
    if (status == 6) {
        getOrderByUserId(pageSize.value);
    }
    else {
        getUserOrderWithStatus(status, pageSize.value)
    }
})

watch(selectedOrderId, (newId) => {
});
</script>