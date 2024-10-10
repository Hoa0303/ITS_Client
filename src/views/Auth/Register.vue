<template>
    <div class="grid grid-cols-2 mt-24">
        <div>
            <router-link to="/">
                <h1 class="text-center text-3xl font-bold" style="color: #48AAE2;">Welcome to</h1>
            </router-link>
            <router-link to="/">
                <h1 class="text-center text-3xl font-bold" style="color: #48AAE2;">ITStore</h1>
            </router-link>
            <div class="justify-center flex mt-14">
                <img src="/register.jpg" style="width: 590px; height: 400px;" alt="">
            </div>
        </div>
        <div class="mt-5">
            <Register @register-success="handleRegisterSuccess" />
        </div>
    </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import Register from "../../components/Auth/RegisterForm.vue";
import authService from "../../services/auth.service";
import { notification, Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Register,
    },
    setup() {
        const router = useRouter();

        const openNotificationWithIcon = (type, message, description) => {
            const key = `open${Date.now()}`;
            const btn = () =>
                h(
                    Button,
                    {
                        type: 'primary',
                        size: 'large',
                        onClick: () => {
                            notification.close(key);
                            router.push({ name: 'Login' });
                        },
                    },
                    { default: () => 'Continue' }
                );

            notification[type]({
                message,
                description,
                btn,
                key,
            });
        };

        const handleRegisterSuccess = async (values) => {
            try {
                const data = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phone,
                    token: values.otp
                }
                // console.log(data);
                await authService.register(data);
                // console.log('Registration successful:', res);
                openNotificationWithIcon('success', 'Congratulations', 'Your account has been successfully created!');
            } catch (error) {
                console.error('Registration failed:', error);
            }
        };

        return { handleRegisterSuccess };
    },
});
</script>
