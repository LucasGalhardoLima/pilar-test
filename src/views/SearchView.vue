<script setup lang="ts">
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { ref, onMounted } from 'vue';
import { useRoute, type LocationQueryValue } from 'vue-router';
import { useSearchStore } from '@/stores/search';

const route = useRoute();
const searchStore = useSearchStore();

const searchString = ref<string | LocationQueryValue[]>(route.query.query as string);
const searchResults = ref<any[]>([]);

const fetchSearch = async () => {
    searchResults.value = await searchStore.fetchSearch(searchString.value);
};

const validateImgSrc = (result: any) => {
    if (result.media_type === 'person') {
        return result.profile_path ? `https://image.tmdb.org/t/p/original${result.profile_path}` : 'https://blocks.astratic.com/img/general-img-portrait.png';
    } else if (!result.poster_path) {
        return `https://image.tmdb.org/t/p/original${result.backdrop_path}`;
    } else if (result.poster_path !== null) {
        return `https://image.tmdb.org/t/p/original${result.poster_path}`;
    } else {
        return 'https://blocks.astratic.com/img/general-img-portrait.png';
    }
};

onMounted(() => {
    fetchSearch();
});
</script>

<template>
    <main>
        <section
            class="h-24 px-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex flex-row items-center">
            <input class="h-12 appearance-none outline-none bg-white rounded p-2 flex-1 pl-6 w-full" type="text"
                placeholder="Buscar por um Filme, Série ou Pessoa..." :value="searchString"
                @input="({ target }) => searchString = target?.value" @keydown.enter="fetchSearch" />
            <button class="absolute right-6" v-if="searchString" @click="searchString = ''">x</button>
        </section>

        <section>
            <div v-if="searchResults.length === 0" class="flex flex-col items-center justify-center h-96">
                <h1 class="text-2xl font-bold">Nenhum resultado encontrado</h1>
                <p class="text-lg">Tente buscar por outro termo</p>
            </div>

            <div v-else>
                <div class="flex flex-col px-24 mt-4">
                    <a v-for="result in searchResults" :key="result.id"
                        :href="`/${result.id}?media_type=${result.media_type}`"
                        class="bg-white min-h-36 flex flex-row mb-4 border border-grey-500 rounded-lg drop-shadow-md">
                        <img class="w-24 rounded-l-lg mr-4" loading="lazy" :src="validateImgSrc(result)" alt="Poster" />
                        <div class="flex flex-col pr-4 py-2">
                            <h1 class="text-lg font-bold">{{ result.title || result.name }} <span
                                    v-if="result.original_title || result.original_name"
                                    class="font-thin text-gray-400">({{
                    result.original_title || result.original_name }})</span></h1>
                            <p v-if="result.release_date || result.first_air_date" class="text-sm text-gray-400 mb-2">{{
                    format(new
                        Date(result.first_air_date || result.release_date), 'PP',
                        { locale: ptBR }) }}
                            </p>
                            <p class="text-sm max-h-20 max-w-42 overflow-hidden">{{ result.overview }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>