<template>
    <div class="py-10">
        <a-select v-model:value="selectedProvince" size="large" class="w-full">
            <a-select-option v-for="item in provinceList" :key="item.code" :value="item.code"
                @click="getDistricts(item.code)">
                {{ item.name }}
            </a-select-option>
        </a-select>

        <a-select v-model:value="selectedDistrict" size="large" class="w-full" :disabled="districtList.length === 0">
            <a-select-option v-for="item in districtList" :key="item.code" :value="item.code"
                @click="getWards(item.code)">
                {{ item.name }}
            </a-select-option>
        </a-select>

        <a-select v-model:value="selectedWard" size="large" class="w-full" :disabled="wardtList.length === 0">
            <a-select-option v-for="item in wardtList" :key="item.code" :value="item.code">
                {{ item.name }}
            </a-select-option>
        </a-select>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import addressService from '../services/address.service';
import { AddressData } from '../hooks/AddressData';

const selectedProvince = ref('');
const selectedDistrict = ref('');
const selectedWard = ref('');

const provinceList = ref<AddressData[]>([]);
const districtList = ref<AddressData[]>([]);
const wardtList = ref<AddressData[]>([]);

async function getProvince() {
    const res = await addressService.getProvince();
    provinceList.value = res.data;
}

async function getDistricts(provinceCode: number) {
    resetDistricts();
    resetWards();
    const res = await addressService.getDistricts(provinceCode);
    districtList.value = res.data.districts;
}

async function getWards(districtCode: number) {
    const res = await addressService.getWards(districtCode);
    wardtList.value = res.data.wards;
}

function resetDistricts() {
    selectedDistrict.value = '';
    districtList.value = [];
}

function resetWards() {
    selectedWard.value = '';
    wardtList.value = [];
}

onMounted(() => {
    getProvince();
});

</script>