<!-- <template>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-1 py-10 sm:px-6 md:px-8 lg:px-28 gap-9">
        <div class="lg:col-span-2 md:col-span-2 shadow-lg rounded-lg p-5 h-fit sticky top-24">
            <Card />
        </div>
        <div class="lg:col-span-6 md:col-span-4 shadow-lg rounded-lg p-5">
            <a-typography-title>Orders</a-typography-title>
            <div v-for="(item, index) in orders" class="border-t-2" :key="index">

                <div class="flex items-center justify-between">
                    <div class="flex items-end my-5 mx-4">
                        <span class="text-3xl">#{{ item.id }}
                            <span class="text-gray-500 text-sm">from {{ item.orderDate }} - {{ item.orderTime }}</span>
                        </span>
                    </div>
                    <div class="flex items-end my-5 mx-4 gap-5">
                        <span class="flex items-center">
                            Status:
                            <a-tag class="p-1 m-2" :color="statusStyles1[item.orderStatus]">
                                {{ OrderSatus[item.orderStatus] }}
                            </a-tag>
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 my-4 mx-4">
                    <div>Payment Method</div>
                    <div>{{ item.paymentMethod }}</div>
                </div>

                <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />
                <div class="grid grid-cols-2 gap-4 my-4 mx-4">
                    <div>Total</div>
                    <div>{{ fomratVND(item.total) }}</div>
                </div>
                <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />
                <div class="grid grid-cols-2 gap-4 my-4 mx-4">
                    <div>Amout Paid</div>
                    <div>{{ fomratVND(item.amountPaid) }}</div>
                </div>
                <div class="flex items-end justify-end my-5 mx-4 gap-5">
                    <a-button size="large" @click="showDrawer(item.id)">View Detail</a-button>

                    <a-popconfirm title="Are you sure delete this order?" ok-text="Yes" cancel-text="No"
                        @confirm="cacelOrder(item.id)">
                        <a-button
                            v-if="OrderSatus[item.orderStatus] == 'Processing' || OrderSatus[item.orderStatus] == 'Confirmed'"
                            danger size="large">
                            Cancel order
                        </a-button>
                    </a-popconfirm>

                    <a-button
                        v-if="!item.reviewed && (OrderSatus[item.orderStatus] == 'Received' || OrderSatus[item.orderStatus] == 'Done')"
                        class="border-orange-500 text-orange-500" size="large" @click="showModal(item.id)">
                        Review
                    </a-button>

                    <a-button v-if="item.payBackUrl != null" size="large" @click="redirectToPayBack(item.payBackUrl)">
                        Repayment
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

            <a-modal class="my-2" v-model:open="modalReview" :title="'Review order #' + selectedOrderId"
                :centered="true" :closable="false" :footer="null" :maskClosable="false">
                <OrderReview :orderId="selectedOrderId" @close="modalReview = false" />
            </a-modal>

        </div>
    </div>
</template> -->

<!-- <script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { Order_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { OrderData, useTableData, OrderSatus, Review } from '../../hooks/OrderData';
import { fomratVND, formatDate, formatTime, getPaymentDeadline } from '../../services/common.service';
import Card from '../../components/Personal/Card.vue';
import OrderDetail from './OrderDetail.vue';
import { FormInstance, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import InfiniteLoading from "v3-infinite-loading";
import OrderReview from './OrderReview.vue';


const open = ref<boolean>(false);
const modalReview = ref(false);

const pageSize = ref(0);
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

const statusStyles: { [key: number]: string } = {
    0: 'text-yellow-500',
    1: 'text-green-500',
    2: 'text-blue-500',
    3: 'text-purple-500',
    4: 'text-orange-500',
    5: 'text-red-500',
};

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



onMounted(() => {
    getOrderByUserId(pageSize.value);
})

watch(selectedOrderId, (newId) => {
});
</script> -->

<template>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-1 py-10 sm:px-6 md:px-8 lg:px-28 gap-9 ">
        <div class="lg:col-span-2 md:col-span-2 shadow-lg rounded-lg p-5 h-fit lg:sticky top-24">
            <Card />
        </div>
        <div class="lg:col-span-6 md:col-span-4 shadow-lg rounded-lg p-5">
            <a-typography-title class="border-b-2">{{ $t('orders') }}</a-typography-title>

            <a-tabs class="min-h-96" tab-position="right" v-model:activeKey="activeKey" value="large">
                <a-tab-pane :key="6" :tab="$t('order.All')">
                    <OrderTable :activeKey="activeKey" />
                </a-tab-pane>
                <a-tab-pane v-for="index in 6" :key="index - 1" :tab="$t('order.' + OrderSatus[index - 1])">
                    <OrderTable :activeKey="index - 1" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OrderSatus } from '../../hooks/OrderData';
import Card from '../../components/Personal/Card.vue';
import OrderTable from '../../components/Order/OrderTable.vue';

const activeKey = ref(6);
</script>