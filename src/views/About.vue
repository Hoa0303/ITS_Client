<template>
    <div class="container mx-auto p-8">
        <h1 class="text-center text-4xl text-blue-950 mb-8">Đội Ngũ Của Chúng Tôi</h1>
        <p class="text-center text-md mb-10">Chúng tôi là những chuyên gia giàu kinh nghiệm với niềm đam mê công nghệ và
            cam kết đối với sự hài lòng của khách hàng.</p>

        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mx-40">
            <div v-for="(member, index) in teamMembers" :key="index" class="p-4 bg-slate-50 rounded-md">
                <div class="avatar-container mb-4">
                    <img :alt="member.name" :src="member.image" class="rounded-full w-32 h-32 object-cover mx-auto" />
                </div>
                <h3 class="text-center text-xl font-semibold">{{ member.name }}</h3>
                <p class="text-center text-gray-500">{{ member.role }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const teamMembers = [
    {
        name: 'John Doe',
        role: 'Lập trình viên',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-5.webp',
    },
    {
        name: 'Alice Brown',
        role: 'Quản lý',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-7.webp',
    },
    {
        name: 'Eva Green',
        role: 'Hỗ trợ',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-21.webp',
    },
    {
        name: 'Bob Johnson',
        role: 'Kiểm thử',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-12.webp',
    },
    {
        name: 'John Doe',
        role: 'Thiết kế',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-5.webp',
    },
    {
        name: 'John Doe',
        role: 'Tạo nội dung',
        image: 'https://partyanimals.com/media/avatars/thumbnails/avatars-5.webp',
    },
];
</script>
