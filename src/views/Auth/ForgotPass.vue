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
            <LoginForm @reset-password="handleChangePass" />
        </div>
    </div>
</template>

<script>
import LoginForm from '../../components/Auth/ForgotForm.vue';
import authService from "../../services/auth.service";
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

export default {
    components: {
        LoginForm,
    },
    setup() {
        const router = useRouter();

        const handleChangePass = async (values) => {
            try {
                const data = {
                    email: values.email,
                    token: values.otp,
                    newPass: values.password
                }
                // console.log(data);
                const res = await authService.reset_password(data);
                success();
            } catch (error) {
                fail();
            }
        };

        const success = () => {
            message
                .loading('Action in progress..', 1.5)
                .then(() => message.success('Change Password successful', 1))
                .then(() => router.push({ name: 'Login' }));
        };

        const fail = () => {
            message
                .loading('Action in progress..', 1.5)
                .then(() => message.error('Token is incorrect. Please try again', 1));
        };

        return {
            handleChangePass,
            success,
            fail,
        };
    },
}
</script>
