<template>
    <div class="py-10 sm:px-6 md:px-8 lg:px-28">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <router-link to="/cart">
                    <div class="flex items-center">
                        <arrow-left-outlined class="text-xs me-1" />
                        <span>Return to cart</span>
                    </div>
                </router-link>
            </a-breadcrumb-item>
        </a-breadcrumb>

        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />

        <div class="text-center text-5xl">
            Checkout
        </div>

        <!-- <div class="grid lg:grid-cols-4 sm:grid-cols-1 justify-between p-4 gap-8">
            <div class="lg:col-span-3 p-4">
                <div key="1" class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">1. </span>Contact Information
                    </div>
                    <div class="">
                        <a-form :model="formState" layout="vertical" name="nest-messages"
                            :validate-messages="validateMessages" @finish="onFinish">
                            <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
                                <a-input v-model:value="formState.user.name" size="large" />
                            </a-form-item>
                            <div class="grid grid-cols-2 gap-3">
                                <a-form-item :name="['user', 'phoneNumber']" label="Phone">
                                    <a-input v-model:value="formState.user.phoneNumber" size="large" />
                                </a-form-item>
                                <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
                                    <a-input v-model:value="formState.user.email" size="large" />
                                </a-form-item>
                            </div>
                        </a-form>
                    </div>
                </div>

                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">2. </span>Shipping
                    </div>
                    <div class="rounded-lg border p-4">
                        <a-tabs v-model:activeKey="activeKey">

                            <a-tab-pane key="1" tab="Pick up from store">
                                <StoreAddress />
                            </a-tab-pane>

                            <a-tab-pane key="2" tab="Delivery" force-render>
                                <div class="">
                                    <a-form :model="formState" layout="vertical" name="nest-messages"
                                        :validate-messages="validateMessages" @finish="onFinish">
                                        <a-form-item :name="['address', 'province']" label="Province"
                                            :rules="[{ required: true }]">
                                            <a-select v-model:value="formState.address.province" size="large">
                                                <a-select-option v-for="item in provinceList" :key="item.code"
                                                    :value="item.code" @click="getDistricts(item.code)">
                                                    {{ item.name }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-item>
                                        <div class="grid grid-cols-2 gap-3">
                                            <a-form-item :name="['address', 'district']" label="District"
                                                :rules="[{ required: true }]">
                                                <a-select v-model:value="formState.address.district" size="large"
                                                    class="w-full" :disabled="districtList.length === 0">
                                                    <a-select-option v-for="item in districtList" :key="item.code"
                                                        :value="item.code" @click="getWards(item.code)">
                                                        {{ item.name }}
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-item>
                                            <a-form-item :name="['address', 'ward']" label="Ward"
                                                :rules="[{ required: true }]">
                                                <a-select v-model:value="formState.address.ward" size="large"
                                                    class="w-full" :disabled="wardtList.length === 0">
                                                    <a-select-option v-for="item in wardtList" :key="item.code"
                                                        :value="item.code">
                                                        {{ item.name }}
                                                    </a-select-option>
                                                </a-select>
                                            </a-form-item>
                                        </div>
                                        <a-form-item :name="['address', 'detail']" label="Detail"
                                            :rules="[{ required: true }]">
                                            <a-textarea v-model:value="formState.address.detail" />
                                        </a-form-item>
                                        <a-form-item>
                                            <a-button type="primary" html-type="submit">Submit</a-button>
                                        </a-form-item>
                                    </a-form>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>

                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">3. </span>Payment
                    </div>
                    <div class="rounded-lg border">

                    </div>
                </div>
            </div>

            <div class="rounded-lg border p-4 h-fit">

            </div>

        </div> -->

        <a-form :model="formState" layout="vertical" name="nest-messages" :validate-messages="validateMessages"
            @finish="onFinish" class="grid lg:grid-cols-4 sm:grid-cols-1 justify-between p-4 gap-8">
            <!-- Information + Address -->
            <div class="lg:col-span-3 p-4">
                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">1. </span>Contact Information
                    </div>
                    <div class="">
                        <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
                            <a-input v-model:value="formState.user.name" size="large" />
                        </a-form-item>
                        <div class="grid grid-cols-2 gap-3">
                            <a-form-item :name="['user', 'phoneNumber']" label="Phone" :rules="[
                                { required: true, message: 'Phone number is required!' },
                                { pattern: /^[0-9]{10}$/, message: 'Phone number is not valid!' }
                            ]">
                                <a-input v-model:value="formState.user.phoneNumber" size="large" />
                            </a-form-item>
                            <a-form-item :name="['user', 'email']" label="Email"
                                :rules="[{ required: true }, { type: 'email' }]">
                                <a-input v-model:value="formState.user.email" size="large" disabled />
                            </a-form-item>
                        </div>
                    </div>
                </div>

                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">2. </span>Shipping
                    </div>
                    <div class="rounded-lg border p-4">
                        <a-tabs v-model:activeKey="activeKey">

                            <a-tab-pane key="1" tab="Pick up from store">
                                <StoreAddress />
                            </a-tab-pane>

                            <a-tab-pane key="2" tab="Delivery" force-render>
                                <div class="">
                                    <a-form-item :name="['address', 'province']" label="Province"
                                        :rules="[{ required: true }]">
                                        <a-select v-model:value="formState.address.province" size="large">
                                            <a-select-option v-for="item in provinceList" :key="item.code"
                                                :value="item.code" @click="getDistricts(item.code, item.name)">
                                                {{ item.name }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <div class="grid grid-cols-2 gap-3">
                                        <a-form-item :name="['address', 'district']" label="District"
                                            :rules="[{ required: true }]">
                                            <a-select v-model:value="formState.address.district" size="large"
                                                class="w-full" :disabled="districtList.length === 0">
                                                <a-select-option v-for="item in districtList" :key="item.code"
                                                    :value="item.code" @click="getWards(item.code, item.name)">
                                                    {{ item.name }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-item>
                                        <a-form-item :name="['address', 'ward']" label="Ward"
                                            :rules="[{ required: true }]">
                                            <a-select v-model:value="formState.address.ward" size="large" class="w-full"
                                                :disabled="wardtList.length === 0">
                                                <a-select-option v-for="item in wardtList" :key="item.code"
                                                    :value="item.code" @click="setWards(item.name)">
                                                    {{ item.name }}
                                                </a-select-option>
                                            </a-select>
                                        </a-form-item>
                                    </div>
                                    <a-form-item :name="['address', 'detail']" label="Detail"
                                        :rules="[{ required: true }]">
                                        <a-textarea v-model:value="formState.address.detail" />
                                    </a-form-item>
                                    <a-form-item>
                                        <a-button type="primary" @click="UpdateAddress">Submit</a-button>
                                    </a-form-item>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>

                <div class="py-1">
                    <div class="text-start text-4xl py-5">
                        <span class="text-gray-400 select-none">3. </span>Payment
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
                    Items in order
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
                    <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                Shipping
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-lg text-gray-500">
                                Pick up from store
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-3">
                        <div class="">
                            <div class="text-lg text-gray-500">
                                Payment
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
                                Subtotal
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
                                Discount
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
                                Total
                            </div>
                        </div>
                        <div class="text-end col-span-2">
                            <div class="text-2xl">
                                {{ fomratVND(total) }}
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <a-button class="w-full" size="large" type="primary" html-type="submit">Submit</a-button>
                    </div>
                </div>
            </div>

        </a-form>
    </div>
</template>


<script lang="ts" setup>
import StoreAddress from '../components/Checkout/StoreAddress.vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import addressService from '../services/address.service';
import { AddressData } from '../hooks/AddressData';
import httpService from '../services/http.service';
import { Order_API, User_API } from '../services/api_url';
import { useCartStore } from '../hooks/CartStore';
import { CartTableData, useTableData } from '../hooks/Data';
import { fomratVND } from '../services/common.service';
import { useRouter } from 'vue-router';

const activeKey = ref('2');

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

const paymentOptions: PaymentOption[] = [
    {
        id: 1,
        title: 'Cash on Delivery',
        description: 'Cash, credit card',
    },
    {
        id: 2,
        title: 'Electronic Payment',
        description: 'PayPal, Yandex.Money, QIWI',
    },
];

const selectedPayment = ref(1);

const selectPayment = (option: number) => {
    selectedPayment.value = option;
};

const provinceList = ref<AddressData[]>([]);
const districtList = ref<AddressData[]>([]);
const wardtList = ref<AddressData[]>([]);

const provinceName = ref('');
const districtName = ref('');
const wardName = ref('');

async function getProvince() {
    const res = await addressService.getProvince();
    provinceList.value = res.data;
}

async function getDistricts(code: number, name: string) {
    resetDistricts();
    resetWards();
    provinceName.value = name;
    const res = await addressService.getDistricts(code);
    districtList.value = res.data.districts;
}

async function getWards(code: number, name: string) {
    resetWards();
    districtName.value = name;
    const res = await addressService.getWards(code);
    wardtList.value = res.data.wards;
}

function setWards(name: string) {
    wardName.value = name;
}

function resetDistricts() {
    formState.address.district = '';
    formState.address.detail = '';
    districtList.value = [];
}

function resetWards() {
    formState.address.ward = '';
    wardtList.value = [];
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const formState = reactive({
    user: {
        name: '',
        phoneNumber: '',
        email: 'huynhnhuthoa881@gmail.com',
    },
    address: {
        province: '',
        district: '',
        ward: '',
        detail: '',
    },
});


const router = useRouter();

async function onFinish() {
    try {
        const address = [formState.address.detail, wardName.value, districtName.value, provinceName.value]
        const data = {
            total: total.value,
            receiver: formState.user.name,
            deliveryAddress: address.join(', '),
            paymentMethodId: paymentOptions[selectedPayment.value - 1].id,
            cartIds: cartData.value.map(e => e.id)
        }
        const res = await httpService.postWithAuth(Order_API, data);
        window.location.href = res;
    } catch {
        console.error('Error:');
    }
};

async function getAddressUser() {
    const res = await httpService.getWithAuth(User_API + '/address');
    if (res) {
        //User
        formState.user.name = res.name;
        formState.user.phoneNumber = res.phoneNumber;
        //Address
        formState.address.province = res.province_code;
        getDistricts(res.province_code, res.province_name)
        formState.address.district = res.district_code;
        getWards(res.district_code, res.district_name);
        setWards(res.ward_name);
        formState.address.ward = res.ward_code;
        formState.address.detail = res.detail;
    }
}

async function UpdateAddress() {
    try {
        const data = {
            name: formState.user.name,
            phoneNumber: formState.user.phoneNumber,
            province_code: formState.address.province,
            province_name: provinceName.value,
            district_code: formState.address.district,
            district_name: districtName.value,
            ward_code: formState.address.ward,
            ward_name: wardName.value,
            detail: formState.address.detail
        }
        const res = await httpService.putWithAuth(User_API + '/address', data);
        console.log(res);
    }
    catch {
        console.error('Error:');
    }
};

onMounted(() => {
    getProvince();
    getAddressUser();
    fetchCartData();
});
</script>