<template>
    <div v-for="(item, index) in nameData" :key="index">
        <a-divider class="bg-gray-100" style="height: 2px;" />
        <div class="flex items-center gap-2">
            <img class="object-contain w-12" :src="toImageLink(item.imageUrl)">
            <div>
                <p class="text-xl mx-1 my-0">{{ item.name }}</p>
                <p class="text-sm my-0 text-gray-400 m-1">Type: {{ item.colorName }}</p>
            </div>
        </div>

        <div class="mt-3">
            <a-form ref="formRef" :model="reviewForms[index]" layout="vertical" name="form_in_modal">
                <span>Quality:
                    <a-rate v-model:value="reviewForms[index].start" />
                </span>

                <a-form-item name="description" label="Comment:">
                    <a-textarea v-model:value="reviewForms[index].description" />
                </a-form-item>
            </a-form>
        </div>
    </div>

    <div class="flex justify-end gap-3">
        <a-button @click="handleCancel">Cancel</a-button>
        <a-button type="primary" @click="submitReviews">Submit</a-button>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useTableData } from '../../hooks/Data';
import httpService from '../../services/http.service';
import { Order_API } from '../../services/api_url';
import { FormInstance, message } from 'ant-design-vue';
import { toImageLink } from '../../services/common.service';

const emit = defineEmits(['close']);

const props = defineProps({
    orderId: { type: Number, default: '' },
});

const formRef = ref<FormInstance>();
const reviewForms = reactive<any[]>([]);

const { nameData, setNameData } = useTableData();

async function getDetail(id: number) {
    try {
        const res = await httpService.getWithAuth(Order_API + `/${id}`);
        const formData = res.productOrderDetails.map((item: any) => {
            return {
                id: item.productId,
                name: item.productName,
                imageUrl: item.imageUrl,
                colorName: item.colorName,
            };
        });
        setNameData(formData);

        reviewForms.splice(0);
        formData.forEach((product: any) => {
            reviewForms.push({
                productId: product.id,
                description: '',
                start: 5,
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

function logFormData(formData: any) {
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
}

async function submitReviews() {
    try {
        const formData = new FormData();

        reviewForms.forEach((review, index) => {
            formData.append(`reviews[${index}].productId`, review.productId);
            formData.append(`reviews[${index}].description`, review.description);
            formData.append(`reviews[${index}].start`, review.start);
        });

        // logFormData(formData);
        await httpService.postWithAuth(Order_API + `/review/${props.orderId}`, formData);
        message.success("Review submitted successfully", 2);
        handleCancel();
    } catch (error) {
        console.error("Submit error:", error);
    }
}

function handleCancel() {
    emit('close');
}

onMounted(() => {
    const id = props.orderId;
    getDetail(id);
});

watch(() => props.orderId, (newId) => {
    getDetail(newId);
});
</script>
