<script setup lang="ts">
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { onMounted, ref, watch } from 'vue';
import { usePopularStore } from '@/stores/popular';

const props = defineProps<{ popularFilter: string }>();

const popularStore = usePopularStore();

const loading = ref<boolean>(false);

const popularData = ref<
    {
        id: number;
        media_type: string;
        name: string;
        title: string;
        poster_path: string;
        first_air_date: string;
        release_date: string;
        vote_average: number;
    }[] | null
>([]);

const fetchPopularMovies = async () => {
    loading.value = true;
    popularData.value = await popularStore.fetchPopularMovies();
    loading.value = false;
};

const fetchPopularTvShows = async () => {
    loading.value = true;
    popularData.value = await popularStore.fetchPopularTvShows();
    loading.value = false;
};


onMounted(() => {
    fetchPopularMovies();
});

watch(props, (newValue: {
    popularFilter: string;
}) => {
    if (newValue.popularFilter === 'movies') {
        fetchPopularMovies();
    } else {
        fetchPopularTvShows();
    }
});
</script>

<template>
    <div class="flex overflow-x-auto">
        <div v-if="loading" class="flex items">
            <p class=" text-lg font-bold">Carregando...</p>
        </div>
        <div v-if="popularData === null" class="flex items">
            <p class=" text-lg font-bold">Erro ao carregar os dados</p>
        </div>
        <div v-if="popularData?.length === 0 && !loading" class="flex items">
            <p class=" text-lg font-bold">Nenhum resultado encontrado</p>
        </div>
        <a class="min-w-40 pr-4" v-for="popularItem in popularData" :key="popularItem.id"
            :href="`/${popularItem.id}?media_type=${popularFilter}`">
            <img class="rounded-lg" :src="`https://image.tmdb.org/t/p/original${popularItem.poster_path}`"
                :alt="popularItem.name" loading="lazy">
            <p class="text-sm font-bold">{{ popularItem.name || popularItem.title }}</p>
            <p class="text-sm">{{ format(new Date(popularItem.first_air_date || popularItem.release_date), 'PP',
            { locale: ptBR }) }}
            </p>
            <p class="text-sm">Nota: <span class="font-bold">{{ (popularItem.vote_average * 10).toFixed(1) }}/10</span>
            </p>
        </a>
    </div>
</template>