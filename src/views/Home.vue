<template>
    <Carousel></Carousel>

    <TrendingProduct></TrendingProduct>

    <PopularBrand></PopularBrand>

    <div class="relative py-10">
        <img src="../assets/images/Carousel/support-img.png" class="w-full h-80">
        <div class="absolute inset-y-[30%] left-[10%]">
            <p class="text-3xl text-white font-medium">Are you confused,which product is suitable for you ?</p>
            <p class="text-3xl text-sky-400 font-semibold">Need consultation? </p>
            <a-button size="large">Contact us</a-button>
        </div>
    </div>

    <div class="pb-10">
        <p class="text-center text-4xl text-blue-950 font-semibold">Why Choose Us</p>
    </div>

</template>

<script lang="ts" setup>
import Carousel from '../components/Home/Carousel.vue';
import TrendingProduct from '../components/Home/TrendingProduct.vue';
import PopularBrand from '../components/Home/PopularBrand.vue';
</script>