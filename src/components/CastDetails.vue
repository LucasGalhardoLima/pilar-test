<script setup lang="ts">
interface Cast {
    id: number;
    name: string;
    profile_path: string;
    character: string;
}
interface Credits {
    cast: Cast[];
}

defineProps<
    {
        credits: Credits | undefined | null;
    }
>();
</script>

<template>
    <div class="mb-8">
        <h2 class="text-2xl font-semibold mt-8 ml-8">Elenco principal</h2>
        <div class="flex flex-row gap-4 overflow-x-auto mt-4 pl-8 min-h-80">
            <div v-for="actor in credits?.cast" :key="actor.id" class="min-w-36">
                <div class="flex flex-col items-center border border-gray-100 rounded-lg h-80 drop-shadow-md">
                    <img class="w-36 h-52 rounded-t-lg" loading="lazy"
                        :src="actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : 'https://blocks.astratic.com/img/general-img-portrait.png'"
                        alt="Actor">
                    <div class="px-4">
                        <p class="text-sm font-semibold mt-2">{{ actor.name }}</p>
                        <p class="text-sm">{{ actor.character }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>