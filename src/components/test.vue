<template>
    <div class="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-1 py-10 sm:px-6 md:px-8 lg:px-28 gap-9">
        <div class="lg:col-span-2 md:col-span-2 shadow-lg rounded-lg p-5 h-fit sticky top-24">
            <Card />
        </div>
        <div class="lg:col-span-6 md:col-span-4 shadow-lg rounded-lg p-5">
            <a-typography-title class="border-b-2">Orders Test</a-typography-title>

            <a-tabs tab-position="right" v-model:activeKey="activeKey" value="large">
                <a-tab-pane :key="6" tab="All">
                    <OrderTable :activeKey="activeKey" />
                </a-tab-pane>
                <a-tab-pane v-for="index in 6" :key="index - 1" :tab="OrderSatus[index - 1]">
                    <OrderTable :activeKey="index - 1" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OrderSatus } from '../hooks/OrderData';
import Card from '../components/Personal/Card.vue';
import OrderTable from './Order/OrderTable.vue';

const activeKey = ref(6);
</script>