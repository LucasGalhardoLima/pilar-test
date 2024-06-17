<script setup lang="ts">
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { onMounted, ref, watch } from 'vue';
import { useTrendingStore } from '@/stores/trending';
import { usePopularStore } from '@/stores/popular';

const trendingStore = useTrendingStore();
const popularStore = usePopularStore();

const trendingData = ref<any>([]);
const popularFilter = ref('movies');
const popularData = ref<any>([]);

const fetchTrending = async () => {
  trendingData.value = await trendingStore.fetchTrending();
};

const fetchPopularMovies = async () => {
  popularData.value = await popularStore.fetchPopularMovies();
};

const fetchPopularTvShows = async () => {
  popularData.value = await popularStore.fetchPopularTvShows();
};

onMounted(() => {
  fetchTrending();
  fetchPopularMovies();
});

watch(popularFilter, (newValue: any) => {
  console.log(newValue);
  if (newValue === 'movies') {
    fetchPopularMovies();
  } else {
    fetchPopularTvShows();
  }
});


</script>

<template>
  <main>
    <section class="h-80 py-4 px-24 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center">
      <h1 class="text-white text-3xl font-bold">Bem-Vindo(a)</h1>
      <p class="text-white mb-8 text-xl">Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</p>

      <div class="flex">
        <input class="h-12 appearance-none outline-none bg-white rounded-full p-2 flex-1" type="text"
          placeholder="Buscar por um Filme, Série ou Pessoa..." />
        <button
          class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-full text-white -ml-12 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">Buscar</button>
      </div>
    </section>
    <section class="pl-24">
      <div class="py-4 flex flex-col">
        <h2 class="text-xl font-bold mb-4">Tendências</h2>

        <div class="flex overflow-x-auto">
          <a class="min-w-40 pr-4" v-for="trendingItem in trendingData" :key="trendingItem.id"
            :href="`/${trendingItem.id}`">
            <img class="rounded-lg" :src="`https://image.tmdb.org/t/p/original${trendingItem.poster_path}`"
              :alt="trendingItem.name">
            <p class="text-sm font-bold">{{ trendingItem.name || trendingItem.title }}</p>
            <p class="text-sm">{{ format(new Date(trendingItem.first_air_date || trendingItem.release_date), 'PP',
            { locale: ptBR }) }}
            </p>
            <p class="text-sm">Nota: <span class="font-bold">{{ (trendingItem.vote_average * 10).toFixed(1) }}/10</span>
            </p>
          </a>
        </div>

      </div>
      <div class="py-4">
        <div class="flex mb-4">
          <h2 class="text-xl font-bold mr-4">Os mais populares</h2>
          <div class="border-2 border-sky-500 rounded-full">
            <button class="py-1 px-2 ease-linear"
              :class="popularFilter === 'movies' ? 'rounded-full bg-sky-700 ease-in duration-300' : 'ease-out duration-300'"
              @click="popularFilter = 'movies'">Filmes</button>
            <button class="py-1 px-2 ease-linear"
              :class="popularFilter === 'shows' ? 'rounded-full bg-sky-700 ease-in duration-300' : 'ease-out duration-300'"
              @click="popularFilter = 'shows'">Séries</button>
          </div>
        </div>

        <div class="flex overflow-x-auto">
          <a class="min-w-40 pr-4" v-for="popularItem in popularData" :key="popularItem.id"
            :href="`/${popularItem.id}`">
            <img class="rounded-lg" :src="`https://image.tmdb.org/t/p/original${popularItem.poster_path}`"
              :alt="popularItem.name">
            <p class="text-sm font-bold">{{ popularItem.name || popularItem.title }}</p>
            <p class="text-sm">{{ format(new Date(popularItem.first_air_date || popularItem.release_date), 'PP',
            { locale: ptBR }) }}
            </p>
            <p class="text-sm">Nota: <span class="font-bold">{{ (popularItem.vote_average * 10).toFixed(1) }}/10</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
