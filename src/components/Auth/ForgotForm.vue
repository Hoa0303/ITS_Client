<template>
    <h1 class="text-center text-3xl font-bold italic mb-0" style="color: #48AAE2;">Forgot Password</h1>

    <div class="justify-center flex mt-5">
        <a-form class="w-96" :model="formState" name="forgot-password" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item name="email" :rules="[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid email!' }
            ]">
                <a-input v-model:value="formState.email" size="large" placeholder="Your email" />
            </a-form-item>

            <a-form-item>
                <div class="flex items-center justify-between">
                    <a-input v-model:value="formState.otp" size="large" placeholder="Your OTP" style="width: 65%;" />
                    <a-button @click="sendOTP" type="primary" :loading="loading" :disabled="isOTPSent"
                        style="background-color: #2544E8; width: 30%; color: white;">
                        {{ otpButtonText }}
                    </a-button>
                </div>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your new password!' }]">
                <a-input-password v-model:value="formState.password" size="large" placeholder="Your new password" />
            </a-form-item>

            <a-form-item name="confirm" :rules="[
                { required: true, message: 'Please confirm your password!' },
                { validator: validateConfirmPassword, message: 'Passwords do not match!' }
            ]">
                <a-input-password v-model:value="formState.confirm" size="large" placeholder="Confirm password" />
            </a-form-item>

            <a-form-item>
                <div class="flex justify-center gap-10">
                    <router-link to="/login">
                        <a-button class="w-32 text-center" type="default" style="background-color: #ccc; color: black;">
                            Cancel
                        </a-button>
                    </router-link>

                    <a-button class="w-32 text-center" type="primary" html-type="submit"
                        style="background-color: #2544E8;">
                        Change
                    </a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue';
import authService from '../../services/auth.service';

interface FormState {
    email: string;
    password: string;
    confirm: string;
    otp: string;
}

const formState = reactive<FormState>({
    email: '',
    password: '',
    confirm: '',
    otp: '',
});

const loading = ref(false);
const isOTPSent = ref(false);
const otpButtonText = ref('Send OTP');
let countdownTimer: number | null = null;

const validateConfirmPassword = async (rule: any, value: any) => {
    if (value !== formState.password) {
        throw new Error('Passwords do not match!');
    }
};

const emit = defineEmits(['reset-password']);

const onFinish = async () => {
    emit('reset-password', formState);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const sendOTP = async () => {
    if (!formState.email) {
        alert('Please input your email before sending OTP!');
        return;
    }

    loading.value = true;
    try {
        await authService.send_code_reset_pass(formState.email)
        setTimeout(() => {
            alert('OTP sent successfully! Please check your email');
            loading.value = false;
            startCountdown();
        }, 2000);
    } catch (error) {
        console.log('Failed to send OTP:', error);
        loading.value = false;
    }
};

const startCountdown = () => {
    isOTPSent.value = true;
    let countdown = 60;
    otpButtonText.value = `${countdown}s`;

    countdownTimer = setInterval(() => {
        countdown--;
        otpButtonText.value = `${countdown}s`;
        if (countdown <= 0) {
            clearInterval(countdownTimer!);
            otpButtonText.value = 'Send OTP';
            isOTPSent.value = false;
        }
    }, 1000);
};
</script>
