<template>
    <div class="py-10 sm:px-6 md:px-8 lg:px-28">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <router-link to="/cart">
                    <div class="flex items-center">
                        <arrow-left-outlined class="text-xs me-1" />
                        <span>{{ $t('checkout.returnToCart') }}</span>
                    </div>
                </router-link>
            </a-breadcrumb-item>
        </a-breadcrumb>

        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />

        <div class="text-center text-5xl">
            {{ $t('checkout.checkout') }}
        </div>

        <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
            @finish="onFinish" class="grid lg:grid-cols-4 sm:grid-cols-1 justify-between p-4 gap-8">
            <!-- Information + Address -->
            <div class="lg:col-span-3 p-4">
                <!-- Information -->
                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">1. </span>{{ $t('checkout.contactInformation') }}
                    </div>
                    <div class="">
                        <div class="grid grid-cols-2 gap-3">
                            <a-form-item :name="['user', 'name']" :label="$t('checkout.name')"
                                :rules="[{ required: true }]">
                                <a-input v-model:value="formState.user.name" size="large" />
                            </a-form-item>
                            <a-form-item :name="['user', 'phoneNumber']" :label="$t('checkout.phone')" :rules="[
                                { required: true, message: 'Phone number is required!' },
                                { pattern: /^[0-9]{10}$/, message: 'Phone number is not valid!' }
                            ]">
                                <a-input v-model:value="formState.user.phoneNumber" size="large" />
                            </a-form-item>
                        </div>
                    </div>
                </div>

                <!-- Address -->
                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">2. </span>{{ $t('checkout.shipping') }}
                    </div>
                    <div class="rounded-lg border p-4">
                        <a-tabs v-model:activeKey="activeKey">

                            <!-- <a-tab-pane key="1" tab="Pick up from store">
                                <StoreAddress />
                            </a-tab-pane> -->

                            <a-tab-pane key="2" tab="Delivery" force-render>
                                <div class="">
                                    <a-form-item :name="['address', 'province']" :label="$t('checkout.province')"
                                        :rules="[{ required: true }]">
                                        <a-select ref="select" v-model:value="formState.address.province" size="large"
                                            showSearch optionFilterProp="label" :options="options1" :labelInValue="true"
                                            @change="handleProvinceChange">
                                        </a-select>
                                    </a-form-item>
                                    <div class="grid grid-cols-2 gap-3">
                                        <a-form-item :name="['address', 'district']" :label="$t('checkout.district')"
                                            :rules="[{ required: true }]">
                                            <a-select v-model:value="formState.address.district" size="large" showSearch
                                                optionFilterProp="label" :options="options2"
                                                :disabled="!districtList.length" :labelInValue="true"
                                                @change="handleDistrictChange">
                                            </a-select>
                                        </a-form-item>
                                        <a-form-item :name="['address', 'ward']" :label="$t('checkout.ward')"
                                            :rules="[{ required: true }]">
                                            <a-select v-model:value="formState.address.ward" size="large" showSearch
                                                optionFilterProp="label" :options="options3"
                                                :disabled="!wardList.length" :labelInValue="true">
                                            </a-select>
                                        </a-form-item>
                                    </div>
                                    <a-form-item :name="['address', 'detail']" :label="$t('checkout.detail')"
                                        :rules="[{ required: true }]">
                                        <a-textarea v-model:value="formState.address.detail" />
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button type="primary" @click="UpdateAddress">{{ $t('update') }}</a-button>
                                    </a-form-item>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>

                <!-- Payment Method -->
                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">3. </span>{{ $t('checkout.payment') }}
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="(option) in paymentOptions" :key="option.id" @click="selectPayment(option.id)"
                            :class="[
                                'border rounded-lg p-2 cursor-pointer flex flex-col justify-center items-center transition-all',
                                selectedPayment === option.id
                                    ? 'border-blue-300 shadow-md'
                                    : 'border-gray-300 hover:shadow'
                            ]">
                            <div class="w-4 h-4 mb-2 rounded-full border-2"
                                :class="selectedPayment === option.id ? 'bg-blue-300 border-blue-300' : 'border-gray-300'">
                            </div>
                            <p class="text-lg font-semibold">{{ option.title.toUpperCase() }}</p>
                            <p class="text-sm text-gray-500">{{ option.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Items in order -->
            <div class="rounded-lg border px-4 h-fit sticky top-32">
                <div class="text-start text-xl pt-4">
                    {{ $t('checkout.itemsInOrder') }}
                </div>

                <!-- Detail on cart  -->
                <div class="">
                    <div v-for="item in cartData" class="grid grid-cols-3 py-4">
                        <div class="col-span-2">
                            <div class="text-sm text-gray-700">
                                {{ item.productName }} -
                                {{ item.rom === 1 ? '1TB' : item.rom + 'GB' }}
                                ({{ item.colorName }})
                            </div>
                            <div class="text-sm text-gray-500">
                                {{ item.quantity }} × {{ fomratVND(item.originPrice) }}
                            </div>
                        </div>
                        <div class="text-end">
                            <div class="text-sm text-gray-700">{{ fomratVND(item.price) }}</div>
                        </div>
                    </div>

                    <a-divider class="bg-gray-100" style="height: 2px;" />
                </div>

                <!-- Option payment -->
                <div class="">
                    <!-- <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                Shipping
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-lg text-gray-500">
                                {{ currentTabContent }}
                            </div>
                        </div>
                    </div> -->

                    <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                {{ $t('checkout.paymentMethod') }}
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-lg text-gray-500">
                                {{ paymentOptions[selectedPayment - 1].title }}
                            </div>
                        </div>
                    </div>
                    <a-divider class="bg-gray-100" style="height: 2px;" />
                </div>

                <!-- OriginPice && Total discount -->
                <div class="">
                    <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                {{ $t('checkout.subtotal') }}
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-lg text-gray-500">
                                {{ fomratVND(originPrice) }}
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                {{ $t('checkout.discount') }}
                            </div>
                        </div>
                        <div class="text-end">
                            <div class="text-lg text-red-400">
                                −{{ fomratVND(discount) }}
                            </div>
                        </div>
                    </div>
                    <a-divider class="bg-gray-100" style="height: 2px;" />
                </div>

                <!-- Total price && confirm checkout -->
                <div class="">
                    <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                {{ $t('checkout.total') }}
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-2xl">
                                {{ fomratVND(total) }}
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <a-button class="w-full" size="large" type="primary" html-type="submit">
                            {{ $t('checkout.checkout') }}
                        </a-button>
                    </div>
                </div>
            </div>

        </a-form>
    </div>
</template>


<script lang="ts" setup>
// import StoreAddress from '../components/Checkout/StoreAddress.vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, reactive, ref } from 'vue';
import addressService from '../services/address.service';
import { ProvinceData, DistrictData, WardData } from '../hooks/AddressData';
import httpService from '../services/http.service';
import { Order_API, User_API } from '../services/api_url';
import { useCartStore } from '../hooks/CartStore';
import { CartTableData, useTableData } from '../hooks/Data';
import { fomratVND } from '../services/common.service';
import { message, notification, SelectProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const activeKey = ref('2');
const currentTabContent = computed(() => {
    return activeKey.value === "1" ? "Pick up from store" : "Delivery";
});

const cartStore = useCartStore();
const selectedItems = ref<CartTableData[]>([]);
const { cartData, setCartData } = useTableData();
const originPrice = ref(0);
const discount = ref(0);
const total = ref(0);

function calculateTotalOriginPrice(items: CartTableData[]) {
    originPrice.value = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.originPrice;
        return acc + itemTotal;
    }, 0);
}

function calculateDisconut(items: CartTableData[]) {
    discount.value = items.reduce((acc, item) => {
        const itemTotal = (item.discount / 100) * item.originPrice;
        return acc + itemTotal;
    }, 0);
}

function calculateTotal(items: CartTableData[]) {
    total.value = items.reduce((acc, item) => {
        const itemTotal = item.quantity * item.price;
        return acc + itemTotal;
    }, 0);
}

function fetchCartData() {
    setCartData(selectedItems.value);
    calculateTotalOriginPrice(cartData.value);
    calculateDisconut(cartData.value);
    calculateTotal(cartData.value);
}

selectedItems.value = cartStore.selectedItems;

interface PaymentOption {
    id: number;
    title: string;
    description: string;
}

const { t } = useI18n();
const paymentOptions = computed<PaymentOption[]>(() => [
    {
        id: 1,
        title: t('checkout.Cash'),
        description: 'Cash',
    },
    {
        id: 2,
        title: t('checkout.Electronic'),
        description: 'VNPay',
    },
]);

const selectedPayment = ref(2);

const selectPayment = (option: number) => {
    selectedPayment.value = option;
};

const provinceList = ref<ProvinceData[]>([]);
const districtList = ref<DistrictData[]>([]);
const wardList = ref<WardData[]>([]);

const options1 = ref<SelectProps['options']>([]);
const options2 = ref<SelectProps['options']>([]);
const options3 = ref<SelectProps['options']>([]);

async function getProvince() {
    const res = await addressService.getProvince();
    provinceList.value = res.data;
    options1.value = provinceList.value.map(province => ({
        value: province.ProvinceID,
        label: province.ProvinceName
    }));
}

async function getDistricts(provinceCode: number) {
    const res = await addressService.getDistricts(provinceCode);
    districtList.value = res.data;
    options2.value = districtList.value.map(district => ({
        value: district.DistrictID,
        label: district.DistrictName
    }));
}

async function getWards(districtCode: number) {
    const res = await addressService.getWards(districtCode);
    wardList.value = res.data;
    options3.value = wardList.value.map(ward => ({
        value: ward.WardCode,
        label: ward.WardName
    }));
}

const handleProvinceChange = (value: Option) => {
    // console.log(`Selected province: ${value}`);
    formState.address.province = value;
    getDistricts(parseInt(value.value));
    formState.address.district = { value: '', label: '' };
    options2.value = [];
    formState.address.ward = { value: '', label: '' };
    options3.value = [];
};

const handleDistrictChange = (value: Option) => {
    // console.log(`Selected district: ${value}`);
    formState.address.district = value;
    getWards(parseInt(value.value));
    formState.address.ward = { value: '', label: '' };
    options3.value = [];
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

interface Option {
    value: string;
    label: string;
}

const formState = reactive({
    user: {
        name: '',
        phoneNumber: '',
        // email: 'huynhnhuthoa881@gmail.com',
    },
    address: {
        province: { value: '', label: '' } as Option,
        district: { value: '', label: '' } as Option,
        ward: { value: '', label: '' } as Option,
        detail: '',
    },
});

const router = useRouter();

async function onFinish() {
    try {
        const address = [
            formState.address.detail, formState.address.ward.label,
            formState.address.district.label, formState.address.province.label
        ]
        const data = {
            total: total.value,
            receiver: formState.user.name,
            phoneNumber: formState.user.phoneNumber,
            deliveryAddress: address.join(', '),
            districtId: formState.address.district.value,
            wardCode: formState.address.ward.value,
            paymentMethodId: paymentOptions.value[selectedPayment.value - 1].id,
            shippingMethod: activeKey.value,
            cartIds: cartData.value.map(e => e.id)
        }
        if (selectedPayment.value == 2) {
            const res = await httpService.postWithAuth(Order_API, data);
            window.location.replace(res);
        }
        else {
            await httpService.postWithAuth(Order_API, data);
            router.replace('/order');
        }
        // } catch {
        //     message.error("Xảy ra lỗi khi thanh toán", 2);
        // }
    } catch (error: any) {
        if (error.response.status == 400) {
            message.error("Vui lòng kiểm tra thông tin thanh toán!", 2);
        }
        else if (error.response.status == 500) {
            message.error(error.response.data, 2);
        }
    }
};

async function getAddressUser() {
    const res = await httpService.getWithAuth(User_API + '/address');
    if (res) {
        // User
        formState.user.name = res.name;
        formState.user.phoneNumber = res.phoneNumber;
        // Address
        formState.address.province = { value: String(res.province_code), label: res.province_name };
        formState.address.district = { value: String(res.district_code), label: res.district_name };
        formState.address.ward = { value: String(res.ward_code), label: res.ward_name };
        formState.address.detail = res.detail;
        getDistricts(res.province_code);
        getWards(res.district_code)
    }
}

async function UpdateAddress() {
    try {
        const data = {
            name: formState.user.name,
            phoneNumber: formState.user.phoneNumber,
            province_code: formState.address.province.value,
            province_name: formState.address.province.label,

            district_code: formState.address.district.value,
            district_name: formState.address.district.label,

            ward_code: formState.address.ward.value,
            ward_name: formState.address.ward.label,

            detail: formState.address.detail
        }
        await httpService.putWithAuth(User_API + '/address', data);
        notification.success({
            message: 'Update your address successfull',
            class: 'text-green-500',
        });
    }
    catch (error) {
        console.log(error);
        notification.error({
            message: 'Fail to update your contact',
            class: 'text-red-500',
        });
    }
};

onMounted(() => {
    if (selectedItems.value.length === 0) {
        router.replace('/cart');
        return;
    }
    getProvince();
    getAddressUser();
    fetchCartData();
});
</script>