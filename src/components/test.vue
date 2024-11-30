<template>
    <div class="bg-white sticky top-0 z-30 shadow-lg">
        <div class="bg-white px-4 lg:px-16 flex justify-between items-center h-24">
            <!-- Button for showing menu on small screens -->
            <MenuOutlined class="text-xl cursor-pointer lg:hidden" @click="showMenuDrawer" />

            <!-- Logo centered on small screens -->
            <router-link to="/" class="flex-grow text-center lg:flex-grow-0">
                <img src="/ITS.png" class="w-24 inline-block" />
            </router-link>

            <!-- Menu on larger screens -->
            <a-menu v-if="windowWidth >= 1024" class="hidden flex-1 justify-center lg:flex text-lg" :inlineCollapsed="false"
                v-model:selectedKeys="current" mode="horizontal" :items="items" />

            <!-- Right-side buttons (Search, User, Cart, etc.) -->
            <div class="flex items-center space-x-4">
                <!-- Search -->
                <SearchOutlined class="text-xl p-1" @click="toggleSearch" />

                <!-- Personal -->
                <router-link v-if="!cookieExists" to="/login">
                    <UserOutlined class="text-xl p-1" />
                </router-link>
                <a-dropdown v-else>
                    <UserOutlined class="text-xl p-1" />
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>
                                <router-link to="/order">{{ t('orders') }}</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <router-link to="/favorite">{{ t('favorites') }}</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <router-link to="/info">{{ t('personal') }}</router-link>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="logOut()">{{ t('logout') }}</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

                <!-- Translations -->
                <a-dropdown trigger="['click']">
                    <GlobalOutlined class="text-xl p-1" />
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="changeLanguage('en')">
                                <a>English</a>
                            </a-menu-item>
                            <a-menu-item @click="changeLanguage('vi')">
                                <a>Tiếng Việt</a>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>

                <!-- Cart -->
                <router-link v-if="!cookieExists" to="/login">
                    <ShoppingCartOutlined class="text-2xl p-1" />
                </router-link>
                <ShoppingCartOutlined v-else class="text-2xl p-1" @click="!isCartPage ? showDrawer() : null" />
            </div>


        </div>

        <!-- Search bar -->
        <div v-if="isSearchVisible" class="bg-white flex justify-center items-center border-t">
            <div class="ps-16 w-full">
                <a-input class="py-5 w-full" size="large" :bordered="false" placeholder="Search..."
                    v-model:value="searchKey" @keydown.enter="performSearch" />
            </div>
            <div class="pe-16">
                <CloseOutlined class="cursor-pointer text-gray-400" @click="toggleSearch" />
            </div>
        </div>

        <!-- Menu Drawer for small screens -->
        <a-drawer :visible="menuDrawerVisible" :closable="false" :onClose="hideMenuDrawer" placement="left"
            title="Menu">
            <a-menu class="text-lg" :inlineCollapsed="false" v-model:selectedKeys="current" mode="vertical"
                :items="items" />
        </a-drawer>

        <!-- Cart Drawer -->
        <a-drawer :title="$t('cart.My cart')" :footer-style="{ textAlign: 'right' }" :closable="false" :open="open"
            @close="onClose">

            <CartComponent ref="cartComponentRef" @updateCart="handleCartUpdate" />

            <template #footer>
                <a-button style="margin-right: 8px" size="large">
                    <router-link to="/cart" @click="onClose">
                        {{ $t('cart.VIEW CART') }}
                    </router-link>
                </a-button>

                <a-button type="primary" @click="checkout" size="large">
                    <router-link to="/checkout">
                        {{ $t('cart.CHECKOUT') }}
                    </router-link>
                </a-button>
            </template>
        </a-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, createVNode, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ShoppingCartOutlined, SearchOutlined, UserOutlined, GlobalOutlined, CloseOutlined, ExclamationCircleOutlined, MenuOutlined } from '@ant-design/icons-vue';
import authService from '../services/auth.service';
import { MenuProps, Modal } from 'ant-design-vue';
import CartComponent from './Cart/CartComponent.vue';
import { useCartStore } from '../hooks/CartStore';
import Cookies from 'js-cookie'
import { useI18n } from 'vue-i18n';

const isSearchVisible = ref(false);
const toggleSearch = () => {
    isSearchVisible.value = !isSearchVisible.value;
};
const searchKey = ref('');
const menuDrawerVisible = ref(false);

const showMenuDrawer = () => {
    menuDrawerVisible.value = true;
};

const hideMenuDrawer = () => {
    menuDrawerVisible.value = false;
};

const windowWidth = ref(window.innerWidth);
const handleResize = () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value >= 1024) {
        menuDrawerVisible.value = false;
    }
};

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

const { locale } = useI18n();
function changeLanguage(lang: string) {
    locale.value = lang;
}


const router = useRouter();
const route = useRoute();

const current = ref<string[]>([]);
const cookieExists = ref(false);

const logOut = () => {
    Modal.confirm({
        title: 'Confirm Logout',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Are you sure you want to log out? All session data will be cleared.',
        onOk() {
            return new Promise<void>((resolve, reject) => {
                Cookies.remove('client_data');
                window.kommunicate.logout();
                setTimeout(() => {
                    resolve();
                    window.location.replace("/login")
                }, 1000);
            }).catch(() => console.log('An error occurred!'));
        },
        onCancel() {
            console.log('Logout action was canceled.');
        },
    });
};

const { t } = useI18n();
const items = computed<MenuProps['items']>(() => [
    {
        key: 'home',
        label: t('home'),
        title: 'Home',
        onClick: () => navigateTo('/')
    },
    {
        key: 'product',
        label: t('product'),
        title: 'Product',
        onClick: () => navigateTo('/product')
    },
    {
        key: 'about',
        label: t('about'),
        title: 'About',
        onClick: () => navigateTo('/about')
    },
    {
        key: 'contact',
        label: t('contact'),
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

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>
