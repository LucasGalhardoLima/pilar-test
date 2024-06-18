<script setup lang="ts">
import { ref } from 'vue';

import SearchInput from '@/components/SearchInput.vue';
import TrendingItems from '@/components/TrendingItems.vue';
import PopularItems from '@/components/PopularItems.vue';

const popularFilter = ref<string>('movie');
</script>

<template>
  <main>
    <section class="h-80 py-4 px-24 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center">
      <h1 class="text-white text-3xl font-bold">Bem-Vindo(a)</h1>
      <p class="text-white mb-8 text-xl">Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.</p>
      <SearchInput />
    </section>
    <section class="pl-24">
      <div class="py-4 flex flex-col">
        <h2 class="text-xl font-bold mb-4">Tendências</h2>
        <TrendingItems />


      </div>
      <div class="py-4">
        <div class="flex mb-4">
          <h2 class="text-xl font-bold mr-4">Os mais populares</h2>
          <div class="border-2 border-sky-500 rounded-full">
            <button class="py-1 px-2 ease-linear"
              :class="popularFilter === 'movie' ? 'rounded-full bg-sky-700 ease-in duration-300' : 'ease-out duration-300'"
              @click="popularFilter = 'movie'">Filmes</button>
            <button class="py-1 px-2 ease-linear"
              :class="popularFilter === 'tv' ? 'rounded-full bg-sky-700 ease-in duration-300' : 'ease-out duration-300'"
              @click="popularFilter = 'tv'">Séries</button>
          </div>
        </div>

        <PopularItems :popularFilter="popularFilter" />
      </div>
    </section>
  </main>
</template>
