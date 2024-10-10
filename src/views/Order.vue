<template>
    Order Page
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Order_API } from '../services/api_url';
import httpService from '../services/http.service';


async function getOrderByUserId() {
    try {
        const res = await httpService.getWithAuth(Order_API + '/user');
        console.log(res);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

onMounted(() => {
    getOrderByUserId();
})

</script>