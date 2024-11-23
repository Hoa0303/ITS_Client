<template>
    <div>
        <div class="flex flex-col items-center">
            <img class="w-24 h-24 rounded-full object-cover cursor-pointer" :src="image" alt="Profile"
                @click="showModal = true" />
            <h2 class="mt-4 text-lg font-semibold text-gray-900">{{ getAuthName() }}</h2>
            <p class="text-sm text-gray-500"></p>
        </div>

        <a-divider class="m-1 bg-gray-100" style="height: 2px;" />

        <div>
            <div class="p-2">
                <router-link to="/order" exact-active-class="text-blue-500"> {{ $t('orders') }} </router-link>
            </div>
            <div class="p-2">
                <router-link to="/favorite" exact-active-class="text-blue-500"> {{ $t('favorites') }} </router-link>
            </div>
            <div class="p-2">
                <router-link to="/info" exact-active-class="text-blue-500"> {{ $t('personal') }} </router-link>
            </div>
        </div>

        <a-modal v-model:open="showModal" title="Chance" @ok="handleOk" @cancel="handleCancel" class="custom-modal"
            ok-text="Update" cancel-text="Cancel" centered width="400px">
            <div class="upload-container">
                <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                    :before-upload="beforeUpload" :max-count="1" :show-upload-list="false" class="upload-avatar">
                    <div v-if="imageUrl" class="avatar-preview">
                        <img :src="imageUrl" alt="avatar" />
                    </div>
                    <div v-else class="upload-placeholder">
                        <loading-outlined v-if="loading" class="upload-icon" />
                        <plus-outlined v-else class="upload-icon" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAuthName } from '../../services/auth.service';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue';
import httpService from '../../services/http.service';
import { User_API } from '../../services/api_url';
import { toImageLink } from '../../services/common.service';

const image = ref('');
const showModal = ref(false);
const fileList = ref<UploadFile[]>([]);
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
let uploadedFile: UploadFile | null = null;

async function getImage() {
    try {
        const res = await httpService.getWithAuth(User_API + "/avatar");
        if (res.imageUrl) {
            image.value = toImageLink(res.imageUrl);
        } else {
            image.value = 'https://partyanimals.com/media/avatars/thumbnails/avatars-4.webp'
        }
    }
    catch (error) {
        console.log(error);
    }
}

const handleOk = async () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append('files', uploadedFile as any);

    loading.value = true;
    try {
        await message.loading('Image updateing!', 1)
        await httpService.putWithAuth(User_API + "/avatar", formData)
        message.success('Image updated successfully!', 1);
        handleCancel();
        getImage();
    } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Failed to update image.');
    } finally {
        loading.value = false;
    }
};

const handleCancel = () => {
    showModal.value = false;
    imageUrl.value = '';
    fileList.value = [];
    uploadedFile = null;
};

const beforeUpload = (file: UploadFile) => {
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file as any);
    return false;
};

onMounted(() => {
    getImage();
})
</script>


<style scoped>
.custom-modal .ant-modal-header {
    background-color: #f5f5f5;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
}

.custom-modal .ant-modal-footer {
    border-top: none;
}

.upload-container {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}

.upload-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: 2px dashed #d9d9d9;
    padding: 20px;
    border-radius: 8px;
    transition: all 0.3s;
}

.upload-avatar:hover {
    border-color: #40a9ff;
    background-color: #fafafa;
}

.avatar-preview img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #595959;
}

.upload-placeholder .upload-icon {
    font-size: 24px;
    color: #40a9ff;
    margin-bottom: 8px;
}

.ant-upload-text {
    font-size: 14px;
    color: #8c8c8c;
}
</style>
