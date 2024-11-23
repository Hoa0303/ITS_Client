<template>
    <div class="py-10 sm:px-6 md:px-8 lg:px-28 h-srceen--header">
        <a-breadcrumb>
            <a-breadcrumb-item><router-link to="/">{{ $t('home') }}</router-link></a-breadcrumb-item>
            <a-breadcrumb-item>{{ $t('Cart') }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-divider class="mt-1 bg-gray-100" style="height: 2px;" />

        <div class="">
            <CartList></CartList>
        </div>
    </div>
</template>


<script lang="ts" setup>
import CartList from '../components/Cart/CartList.vue';
</script>