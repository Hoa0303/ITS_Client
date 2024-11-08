<template>
    <div class="grid grid-cols-2 gap-0 mt-24">
        <div>
            <router-link to="/">
                <h1 class="text-center text-3xl font-bold" style="color: #48AAE2;">Welcome to</h1>
            </router-link>
            <router-link to="/">
                <h1 class="text-center text-3xl font-bold" style="color: #48AAE2;">ITStore</h1>
            </router-link>
            <div class="justify-center flex">
                <img src="/login.jpg" alt="" style="height: 400px;">
            </div>
        </div>
        <div class="mt-10">
            <LoginForm @login-success="handleLoginSuccess" />
        </div>
    </div>
</template>

<script>
import LoginForm from '../../components/Auth/LoginForm.vue';
import authService, { getAuthName } from "../../services/auth.service";
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

export default {
    components: {
        LoginForm,
    },
    setup() {
        const router = useRouter();

        const handleLoginSuccess = async (values) => {
            try {
                const data = {
                    username: values.username,
                    password: values.password
                }
                await authService.login(data);
                success();
            } catch (error) {
                fail();
            }
        };

        const success = () => {
            message
                .loading('Action in progress..', 1.5)
                .then(() => message.success('Login successful', 1))
                // .then(() => router.push({ name: 'Home' }));
                .then(() => window.location.replace('/'));
        };

        const fail = () => {
            message
                .loading('Action in progress..', 1.5)
                .then(() => message.error('Email or password is incorrect', 1));
        };

        return {
            handleLoginSuccess,
            success,
            fail,
        };
    },
}
</script>
