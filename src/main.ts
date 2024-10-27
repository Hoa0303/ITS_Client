import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router';

import {
    Avatar, Button, Col, Dropdown, Form,
    Input, Menu, Modal, PageHeader, Pagination,
    Row, Image, Table, Card, Radio, InputNumber,
    Upload, Checkbox, Select, Switch,
    Carousel, Slider, Badge, Rate, Divider, Drawer,
    Breadcrumb, Tabs, Collapse, Result, Typography,
    Statistic, Spin, Popconfirm, Tag, Comment,
    Tooltip
} from 'ant-design-vue';

const components = [
    Button, Input, Form, Avatar, Col,
    Row, Menu, PageHeader, Dropdown, Pagination,
    Modal, Image, Table, Card, Upload,
    Checkbox, Select, Radio, InputNumber, Switch,
    Carousel, Slider, Badge, Rate, Divider, Drawer,
    Breadcrumb, Tabs, Collapse, Result, Typography, 
    Statistic, Spin, Popconfirm, Tag, Comment,
    Tooltip
];
const pinia = createPinia()

import './assets/main.css'
import 'ant-design-vue/dist/reset.css';

import DefaultLayout from './components/DefaultLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

const app = createApp(App);

app.component('default-layout', DefaultLayout);
app.component('empty-layout', EmptyLayout);
components.forEach(component => app.use(component));

app.use(router)
app.use(pinia)
app.mount('#app');
