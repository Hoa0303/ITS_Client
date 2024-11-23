<template>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 py-10 sm:px-6 md:px-8 lg:px-28 gap-9">
        <div class="lg:col-span-2 md:col-span-2 shadow-lg rounded-lg p-5 h-fit sticky top-24">
            <Card class="sticky top-24" />
        </div>
        <div class="lg:col-span-6 md:col-span-4 shadow-lg rounded-lg p-5">
            <a-typography-title>Personal Info</a-typography-title>

            <!-- Contact -->
            <div class="border-t-2">
                <a-typography-title class="mt-5" :level="4">Contact</a-typography-title>
                <a-form layout="vertical" :model="formState.user">
                    <a-form-item label="Full name" name="fullname"
                        :rules="[{ required: true, message: 'Please input your full name!' }]">
                        <a-input v-model:value="formState.user.fullname" size="large" />
                    </a-form-item>
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item label="Phone Number" name="phonenumber" :rules="[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Phone number is not valid!' }
                        ]">
                            <a-input v-model:value="formState.user.phonenumber" size="large" />
                        </a-form-item>
                        <a-form-item label="Email">
                            <a-input v-model:value="formState.user.email" size="large" disabled />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" @click="updateInfor()">Update</a-button>
                        </a-form-item>
                    </div>
                </a-form>
            </div>

            <!-- Address -->
            <div class="border-t-2">
                <a-typography-title class="mt-5" :level="4">Address</a-typography-title>
                <a-form layout="vertical" :model="formState.address">
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item label="Receiver" name="receiver"
                            :rules="[{ required: true, message: 'Please input receiver' }]">
                            <a-input v-model:value="formState.address.receiver" size="large" />
                        </a-form-item>
                        <a-form-item label="Phone Number" name="phoneNumber" :rules="[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[0-9]{10}$/, message: 'Phone number is not valid!' }
                        ]">
                            <a-input v-model:value="formState.address.phoneNumber" size="large" />
                        </a-form-item>
                    </div>
                    <a-form-item name="province" label="Province" :rules="[{ required: true }]">
                        <a-select ref="select" v-model:value="formState.address.province" size="large" showSearch
                            optionFilterProp="label" :options="options1" :labelInValue="true"
                            @change="handleProvinceChange">
                        </a-select>
                    </a-form-item>
                    <div class="grid grid-cols-2 gap-3">
                        <a-form-item name="district" label="District" :rules="[{ required: true }]">
                            <a-select v-model:value="formState.address.district" size="large" :options="options2"
                                showSearch optionFilterProp="label" :disabled="!districtList.length"
                                :labelInValue="true" @change="handleDistrictChange">
                            </a-select>
                        </a-form-item>
                        <a-form-item name="ward" label="Ward" :rules="[{ required: true }]">
                            <a-select v-model:value="formState.address.ward" size="large" :options="options3" showSearch
                                optionFilterProp="label" :disabled="!wardList.length" :labelInValue="true">
                            </a-select>
                        </a-form-item>
                    </div>
                    <a-form-item name="detail" label="Detail" :rules="[{ required: true }]">
                        <a-textarea v-model:value="formState.address.detail" size="large" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="UpdateAddress()">Update</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import Card from '../../components/Personal/Card.vue';
import { User_API } from '../../services/api_url';
import httpService from '../../services/http.service';
import { notification } from 'ant-design-vue';
import addressService from '../../services/address.service';
import { DistrictData, ProvinceData, WardData } from '../../hooks/AddressData';
import { SelectProps } from 'ant-design-vue/es/vc-select';


interface Option {
    value: string;
    label: string;
}

const formState = reactive({
    user: {
        fullname: '',
        phonenumber: '',
        email: '',
    },
    address: {
        receiver: '',
        phoneNumber: '',
        province: { value: '', label: '' } as Option,
        district: { value: '', label: '' } as Option,
        ward: { value: '', label: '' } as Option,
        detail: '',
    },
});

async function getInfor() {
    try {
        const res = await httpService.getWithAuth(User_API + '/infor');
        formState.user.fullname = res.fullName;
        formState.user.email = res.email;
        formState.user.phonenumber = res.phoneNumber;
    }
    catch (error) {
        console.log(error);
    }
}

const updateInfor = async () => {
    try {
        const data = {
            fullName: formState.user.fullname,
            phoneNumber: formState.user.phonenumber
        }
        await httpService.putWithAuth(User_API + "/infor", data)
        notification.success({
            message: 'Update your contact successfull',
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
    console.log(`Selected province: ${value}`);
    formState.address.province = value;
    getDistricts(parseInt(value.value));
    formState.address.district = { value: '', label: '' };
    options2.value = [];
    formState.address.ward = { value: '', label: '' };
    options3.value = [];
};

const handleDistrictChange = (value: Option) => {
    console.log(`Selected district: ${value}`);
    formState.address.district = value;
    getWards(parseInt(value.value));
    formState.address.ward = { value: '', label: '' };
    options3.value = [];
};

async function getAddressUser() {
    const res = await httpService.getWithAuth(User_API + '/address');
    if (res) {
        // Receiver
        formState.address.receiver = res.name;
        formState.address.phoneNumber = res.phoneNumber;

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
            name: formState.address.receiver,
            phoneNumber: formState.address.phoneNumber,
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
}

onMounted(() => {
    getInfor();
    getAddressUser();
    getProvince();
})

</script>