import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from './views/Auth/Login.vue'
import ForgotPass from './views/Auth/ForgotPass.vue'
import Register from './views/Auth/Register.vue'

import Home from './views/Home.vue'

import Product from './views/Product/Product.vue'
import ProductDetail from './views/Product/ProductDetail.vue'

import About from './views/About.vue'

import Contact from './views/Contact.vue'

import Order from './views/Order/Order.vue'
import OrderDetail from './views/Order/OrderDetail.vue'

import Favorite from './views/Personal/Favorite.vue'

import Personal from './views/Personal/Personal.vue'

import Cart from './views/Cart.vue'

import Checkout from './views/Checkout.vue'

import PaymentResult from './views/PaymentResult.vue'

import NotFound from './views/NotFound.vue'

import test from './components/test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: ForgotPass,
    meta: { layout: 'empty' },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'empty' },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/product/:id',
    name: 'Details',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/order/:id',
    name: 'Order Detail',
    component: OrderDetail,
    props: true,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
  },
  {
    path: '/info',
    name: 'Information',
    component: Personal,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/paymentresult',
    name: 'Payment Result',
    component: PaymentResult,
    meta: { layout: 'empty' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
  {
    path: '/test',
    name: 'notfound',
    component: test,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})

export default router
