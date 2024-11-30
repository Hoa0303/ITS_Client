<template>
    <div class="h-screen flex justify-center items-center">
        <div v-if="!params || !callbackUrl">
            <NotFound />
        </div>
        <div v-else>
            <a-spin class="me-5" /> Đang xử lý thanh toán...
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notification, Spin } from 'ant-design-vue';
import { Payment_APi } from '../services/api_url';
import httpService from '../services/http.service';
import NotFound from './NotFound.vue';
import { VNPayRequest } from '../hooks/VNPayRequest';


interface VNPayCallback {
    vnp_TmnCode?: string;
    vnp_Amount?: string;
    vnp_SecureHash?: string;
    vnp_ResponseCode?: string;
    vnp_TransactionStatus?: string;
    vnp_TransactionNo?: string;
}

const route = useRoute();
const router = useRouter();

const params = ref<any>(null);
const callbackUrl = ref<string | null>(null);

onMounted(() => {
    const newParams = Object.fromEntries(new URLSearchParams(route.query as any).entries()) as VNPayRequest;
    if (
        !newParams.vnp_TmnCode ||
        !newParams.vnp_Amount ||
        !newParams.vnp_SecureHash ||
        !newParams.vnp_ResponseCode ||
        !newParams.vnp_TransactionStatus ||
        !newParams.vnp_TransactionNo ||
        Object.entries(newParams).length === 0
    ) {
        params.value = null;
        callbackUrl.value = null;
    } else {
        params.value = newParams;
        callbackUrl.value = '/vnpay-callback';
    }
});

const handlePayment = async () => {
    if (params.value && callbackUrl.value) {
        try {
            console.log(params.value);
            await httpService.getWithParams(Payment_APi + callbackUrl.value, params.value);
            if (params.value.vnp_TransactionStatus == "00") {
                notification.success({
                    message: 'Thanh toán thành công',
                    description: 'Vui lòng kiểm tra lại đơn hàng của bạn',
                    class: 'text-green-500',
                });
            }
            else {
                notification.warning({
                    message: 'Có lỗi xảy ra!',
                    description: 'Vui lòng thanh toán lại',
                    class: 'text-red-500',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Thanh toán thất bại',
                description: 'Vui lòng thanh toán lại',
                class: 'text-red-500',
            });
        } finally {
            router.replace('/order');
        }
    }
};

watch([params, callbackUrl], () => {
    handlePayment();
});

</script>
