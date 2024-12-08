<template>
    <div class="text-center py-8 h-srceen--header">
        <h2 class="text-center text-4xl text-blue-950 mb-8">Chúng tôi luôn sẵn sàng hỗ trợ bạn</h2>
        <div class="flex flex-wrap justify-center gap-6">
            <div v-for="(section, index) in sections" :key="index"
                class="bg-gray-100 rounded-lg shadow-lg p-6 w-64 text-center">
                <h3 class="text-lg font-medium text-gray-900 mb-4">{{ section.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ section.description }}</p>
                <a :href="'tel:' + section.phone" class="text-blue-500 font-medium hover:underline">
                    {{ section.phone }}
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Section {
    title: string;
    description: string;
    phone: string;
}

const sections: Section[] = [
    {
        title: "Bộ phận Bán hàng",
        description:
            "Đội ngũ bán hàng chuyên nghiệp luôn sẵn sàng hỗ trợ và tư vấn tận tình cho khách hàng.",
        phone: "1800 123 4567",
    },
    {
        title: "Bộ phận Khiếu nại",
        description:
            "Chúng tôi luôn coi trọng sự hài lòng của khách hàng và cam kết xử lý các khiếu nại một cách nhanh chóng và hiệu quả.",
        phone: "1800 123 4567",
    },
    {
        title: "Bộ phận Đổi trả",
        description:
            "Chúng tôi cung cấp chính sách đổi trả hàng nhanh chóng, dễ dàng để đảm bảo sự hài lòng của bạn.",
        phone: "1800 123 4567",
    },
    {
        title: "Bộ phận Marketing",
        description:
            "Đội ngũ marketing hợp tác chặt chẽ với các doanh nghiệp để giúp họ phát triển và thành công.",
        phone: "1800 123 4567",
    },
];
</script>