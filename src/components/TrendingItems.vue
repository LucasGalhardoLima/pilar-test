<script setup lang="ts">
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { onMounted, ref } from 'vue';
import { useTrendingStore } from '@/stores/trending';

const trendingStore = useTrendingStore();

const loading = ref<boolean>(false);

const trendingData = ref<
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

const fetchTrending = async () => {
    try {
        loading.value = true;
        trendingData.value = await trendingStore.fetchTrending();
        loading.value = false;
    } catch (error) {
        console.error(error);
        trendingData.value = null;
        loading.value = false;
    }
};

onMounted(() => {
    fetchTrending();
});
</script>

<template>
    <div class="flex overflow-x-auto">
        <div v-if="loading" class="flex items">
            <p class=" text-lg font-bold">Carregando...</p>
        </div>
        <div v-if="trendingData === null" class="flex items">
            <p class=" text-lg font-bold">Erro ao carregar os dados</p>
        </div>
        <div v-if="trendingData?.length === 0 && !loading" class="flex items">
            <p class=" text-lg font-bold">Nenhum resultado encontrado</p>
        </div>
        <a class="min-w-40 pr-4" v-for="trendingItem in trendingData" :key="trendingItem.id"
            :href="`/${trendingItem.id}?media_type=${trendingItem.media_type}`">
            <img class="rounded-lg" :src="`https://image.tmdb.org/t/p/original${trendingItem.poster_path}`"
                :alt="trendingItem.name" loading="lazy">
            <p class="text-sm font-bold">{{ trendingItem.name || trendingItem.title }}</p>
            <p class="text-sm">{{ format(new Date(trendingItem.first_air_date || trendingItem.release_date), 'PP',
            { locale: ptBR }) }}
            </p>
            <p class="text-sm">Nota: <span class="font-bold">{{ (trendingItem.vote_average * 10).toFixed(1) }}/10</span>
            </p>
        </a>
    </div>
</template>