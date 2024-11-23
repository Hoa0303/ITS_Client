<template>
    <div class="grid grid-cols-2 gap-3">
        <div class="">
            <MapComponent />
        </div>
        <div class="">
            <div class="text-gray-600 font-semibold">IT Store</div>
            <div>
                <span class="text-gray-600 font-semibold">Địa chỉ</span>
                18/137, đường Hoàng Văn Thụ, phường An Cư, quận Ninh Kiều, Thành phố Cần Thơ
            </div>
            <div>
                <span class="text-gray-600 font-semibold">Mở cửa</span>
                10:00–22:00
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MapComponent from '../MapComponent.vue';

</script>