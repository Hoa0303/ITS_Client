<template>
    <div class="bg-white sticky top-0 z-30 shadow-lg">
        <div class="bg-white px-16 flex justify-between items-center h-24">
            <router-link to="/">
                <img src="/ITS.png" class="w-24" />
            </router-link>
            <a-menu class="text-lg" v-model:selectedKeys="current" mode="horizontal" :items="items" />
            <div>
                <SearchOutlined class="text-xl p-1" @click="toggleSearch" />

                <router-link v-if="!cookieExists" to="/login">
                    <UserOutlined class="text-xl p-1" />
                </router-link>
                <a-dropdown v-else>
                    <UserOutlined class="text-xl p-1" />
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <router-link to="/order">Orders</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <router-link to="/favorite">Favorites</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <router-link to="/info">Personal</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">Log out</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

                <!-- <a-dropdown trigger="['click']">
                    <GlobalOutlined class="text-xl p-1" />
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <a href="javascript:;">1st menu item</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a href="javascript:;">2nd menu item</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown> -->

                <router-link v-if="!cookieExists" to="/login">
                    <ShoppingCartOutlined class="text-2xl p-1" />
                </router-link>
                <ShoppingCartOutlined v-else class="text-2xl p-1" @click="!isCartPage ? showDrawer() : null" />
                <a-drawer title="My cart" :footer-style="{ textAlign: 'right' }" :closable="false" :open="open"
                    @close="onClose">

                    <CartComponent ref="cartComponentRef" @updateCart="handleCartUpdate" />

                    <template #footer>
                        <a-button style="margin-right: 8px" size="large">
                            <router-link to="/cart" @click="onClose">
                                VIEW CART
                            </router-link>
                        </a-button>

                        <a-button type="primary" @click="checkout" size="large">
                            <router-link to="/checkout">
                                CHECKOUT
                            </router-link>
                        </a-button>
                    </template>
                </a-drawer>
            </div>

        </div>
        <div v-if="isSearchVisible" class="bg-white flex justify-center items-center border-t ">
            <div class="ps-16 w-full">
                <a-input class="py-5 w-full" size="large" :bordered="false" placeholder="Search..."
                    v-model:value="searchKey" @keydown.enter="performSearch" />
            </div>
            <div class="pe-16">
                <CloseOutlined class="cursor-pointer text-gray-400" @click="toggleSearch" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ShoppingCartOutlined, SearchOutlined, UserOutlined, GlobalOutlined, CloseOutlined } from '@ant-design/icons-vue';
import authService from '../services/auth.service';
import { MenuProps } from 'ant-design-vue';
import CartComponent from './Cart/CartComponent.vue';
import { useCartStore } from '../hooks/CartStore';

const isSearchVisible = ref(false);
const toggleSearch = () => {
    isSearchVisible.value = !isSearchVisible.value;
};
const searchKey = ref('');

const open = ref<boolean>(false);
const cartStore = useCartStore();

const handleCartUpdate = (data: any) => {
    cartStore.setSelectedItems(data);
};

const checkout = () => {
    onClose();
};

const cartComponentRef = ref<InstanceType<typeof CartComponent> | null>(null);

const showDrawer = () => {
    open.value = true;
    if (cartComponentRef.value) {
        cartComponentRef.value.getCart();
    }
};

const onClose = () => {
    open.value = false;
};


const router = useRouter();
const route = useRoute();

const current = ref<string[]>([]);
const cookieExists = ref(false);

const items = ref<MenuProps['items']>([
    {
        key: 'home',
        label: 'Home',
        title: 'Home',
        onClick: () => navigateTo('/')
    },
    {
        key: 'product',
        label: 'Product',
        title: 'Product',
        onClick: () => navigateTo('/product')
    },
    {
        key: 'about',
        label: 'About',
        title: 'About',
        onClick: () => navigateTo('/about')
    },
    {
        key: 'contact',
        label: 'Contact',
        title: 'Contact',
        onClick: () => navigateTo('/contact')
    }
]);

const updateCurrentBasedOnRoute = () => {
    const path = route.path;
    if (path.includes('product')) {
        current.value = ['product'];
    } else if (path.includes('about')) {
        current.value = ['about'];
    } else if (path.includes('contact')) {
        current.value = ['contact'];
    } else if (path === '/') {
        current.value = ['home'];
    } else {
        current.value = [];
    }
};

const checkCookie = () => {
    cookieExists.value = authService.getAuthCookie() !== undefined;
};

const isCartPage = computed(() => {
    return route.path === '/cart';
});

const navigateTo = (path: string) => {
    router.push(path);
};

const performSearch = () => {
    if (searchKey.value.trim()) {
        router.push({ path: '/product', query: { search: searchKey.value } });
        toggleSearch();
    }
};

onMounted(() => {
    updateCurrentBasedOnRoute();
    checkCookie();
});

watch(
    () => route.path,
    () => {
        updateCurrentBasedOnRoute();
    }
);
</script>