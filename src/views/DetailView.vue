<script setup lang="ts">
import { format } from 'date-fns';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailsStore } from '@/stores/details';

const route = useRoute();
const detailsStore = useDetailsStore();

const details = ref<any>({});

const fetchDetails = async () => {
    if (route.query.media_type === 'movie') {
        details.value = await detailsStore.fetchMovieDetails(route.params.id);
    } else if (route.query.media_type === 'tv') {
        details.value = await detailsStore.fetchTvShowDetails(route.params.id);
    }
};

function toHoursAndMinutes(totalMinutes: number) {
    if (totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;

    }

    return ''
}

onMounted(() => {
    fetchDetails()
});
</script>

<template>
    <main>
        <section class="w-full h-2/3 bg-gray-800">
            <img :src="`https://image.tmdb.org/t/p/original${details.backdrop_path}`" alt="Movie poster"
                class="w-full h-2/3 object-cover absolute top-0 left-0 z-0">
            <div
                class="flex flex-row justify-between p-8 text-white bg-black/80 absolute top-0 left-0 w-full h-2/3 z-10 px-4 py-2">
                <div class="rounded-lg">
                    <img class="max-w-72 max-h-96 rounded-t-lg"
                        :src="`https://image.tmdb.org/t/p/original${details.poster_path}`" alt="Movie poster">
                    <div class="bg-sky-800 py-2 px-4 rounded-b-lg cursor-pointer">
                        <a class="cursor-pointer" :href="details.homepage" target="_blank">Assistir</a>
                    </div>
                </div>
                <div class="flex-flex-col">
                    <h1 class="text-2xl font-bold">{{ details.title }} <span class="font-thin text-gray-500">{{
                        details?.release_date ? `(${format(new Date(details?.release_date),
                            'yyyy')})` : '' }}</span></h1>
                    <div>
                        <span>{{ details?.release_date ? `${format(new Date(details?.release_date),
                            'dd/MM/yyyy')}` : '' }}</span>
                        {{ '-' }}
                        <span>{{ details?.genres?.map((item: any) => item.name)?.join(', ') }}</span>
                        {{ '-' }}
                        <span>{{ toHoursAndMinutes(details.runtime) }}</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>