<script setup lang="ts">
defineProps<
    {
        posterLink: string;
        website: string;
    }
>();
</script>

<template>
    <div class="rounded-lg">
        <img id="content-poster" class="max-w-72 max-h-96 rounded-t-lg" loading="lazy"
            :src="posterLink || 'https://blocks.astratic.com/img/general-img-portrait.png'" alt="Movie poster">
        <div class="bg-sky-800 py-2 px-4 rounded-b-lg cursor-pointer">
            <a class="cursor-pointer" :href="website" target="_blank">Assistir</a>
        </div>
    </div>
</template>