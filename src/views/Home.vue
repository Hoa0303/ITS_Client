<template>
    <Carousel></Carousel>

    <TrendingProduct></TrendingProduct>

    <PopularBrand></PopularBrand>

    <div class="relative py-10">
        <img src="../assets/images/Carousel/support-img.png" class="w-full h-80">
        <div class="absolute inset-y-[30%] left-[10%]">
            <p class="text-3xl text-white font-medium">
                {{ $t('Are you confused,which product is suitable for you ?') }}
            </p>
            <p class="text-3xl text-sky-400 font-semibold">
                {{ $t('Need consultation?') }}
            </p>
            <a-button size="large">
                {{ $t('Contact us') }}
            </a-button>
        </div>
    </div>

    <div class="pb-10">
        <p class="text-center text-4xl text-blue-950 font-semibold">{{ $t('Why Choose Us') }}</p>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                <!-- Shipping -->
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <div class="text-indigo-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-truck mx-auto w-12 h-12" viewBox="0 0 16 16">
                            <path
                                d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800">Vận Chuyển Nhanh</h3>
                    <p class="text-gray-600 mt-2">Chúng tôi cung cấp dịch vụ vận chuyển nhanh chóng, đảm bảo sản phẩm
                        đến tay bạn trong thời gian ngắn nhất.</p>
                </div>
                <!-- Quantity -->
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <div class="text-indigo-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-snow2 w-12 h-12 mx-auto" viewBox="0 0 16 16">
                            <path
                                d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793v-1.086l-.646.647a.5.5 0 0 1-.707-.708L7.5 10.293V8.866l-1.236.713-.495 1.85a.5.5 0 1 1-.966-.26l.237-.882-.94.542-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495.94-.542-.882-.237a.5.5 0 1 1 .258-.966l1.85.495L7 8l-1.236-.713-1.849.495a.5.5 0 1 1-.258-.966l.883-.237-.94-.542-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 0 1 .966-.258l.495 1.849.94.542-.236-.883a.5.5 0 0 1 .966-.258l.495 1.849 1.236.713V5.707L6.147 4.354a.5.5 0 1 1 .707-.708l.646.647V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 0 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v1.086l.647-.647a.5.5 0 1 1 .707.708L8.5 5.707v1.427l1.236-.713.495-1.85a.5.5 0 1 1 .966.26l-.236.882.94-.542.495-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495-.94.542.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l1.236.713 1.849-.495a.5.5 0 0 1 .259.966l-.883.237.94.542 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-.94-.542.236.883a.5.5 0 0 1-.966.258L9.736 9.58 8.5 8.866v1.427l1.354 1.353a.5.5 0 0 1-.707.708l-.647-.647v1.086l1.354 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800">Chất Lượng Tốt Nhất</h3>
                    <p class="text-gray-600 mt-2">Chúng tôi cam kết cung cấp cho khách hàng các sản phẩm chất lượng
                        tốt nhất.</p>
                </div>
                <!--  -->
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <div class="text-indigo-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-hand-thumbs-up w-12 h-12 mx-auto" viewBox="0 0 16 16">
                            <path
                                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800">Ưu Đãi Tốt Nhất</h3>
                    <p class="text-gray-600 mt-2">Chúng tôi tự hào mang đến cho khách hàng các ưu đãi và giảm giá
                        tốt nhất.</p>
                </div>
                <!-- Security  -->
                <div class="bg-white shadow-md rounded-lg p-6 text-center">
                    <div class="text-indigo-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-shield-shaded w-12 h-12 mx-auto" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 14.933a1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800">Thanh Toán An Toàn</h3>
                    <p class="text-gray-600 mt-2">Chúng tôi cung cấp nhiều phương thức thanh toán an toàn để đảm bảo
                        giao dịch của bạn luôn an toàn và bảo mật.</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Carousel from '../components/Home/Carousel.vue';
import TrendingProduct from '../components/Home/TrendingProduct.vue';
import PopularBrand from '../components/Home/PopularBrand.vue';
</script>