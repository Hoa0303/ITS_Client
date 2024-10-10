<template>
    <h1 class="text-center text-3xl font-bold italic" style="color: #48AAE2;">Login</h1>

    <div class="justify-center flex mt-10">
        <a-form class="w-80" :model="formState" name="basic" autocomplete="off" @finish="onFinish">

            <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" size="large" placeholder="Username or email" />
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" size="large" placeholder="Password" />
            </a-form-item>

            <div class="grid grid-rows-2 justify-end">
                <router-link to="/forgot" class="text-end font-semibold" style="color: #2544E8"> Forgot
                    password?</router-link>
                <p>No account?
                    <router-link class="text-end font-semibold" style="color: #2544E8" :to="{ name: 'Register' }">
                        Create one
                    </router-link>
                </p>
            </div>

            <a-form-item class="justify-center flex mt-5">
                <a-button class="w-32" type="primary" html-type="submit"
                    style="background-color: #2544E8;">Login</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface FormState {
    username: string;
    password: string;
}

const formState = reactive<FormState>({
    username: 'huynhnhuthoa881@gmail.com',
    password: 'Hoa123',
});

const emit = defineEmits(['login-success']);

const onFinish = async (values: FormState) => {
    emit('login-success', values);
};

</script>
