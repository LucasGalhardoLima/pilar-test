<script setup lang="ts">
import { format } from 'date-fns';
import { defineProps } from 'vue';
defineProps({
    details: Object,
    credits: Object
});
</script>

<template>
    <section class="w-full h-5/6">
        <div class="flex flex-col">
            <div>
                <img :src="`https://image.tmdb.org/t/p/original${details?.backdrop_path}`" alt="Movie poster"
                    height="705" class="w-full z-0 max-h-[810px] bg-right-bottom bg-contain aspect-video">
                <div
                    class="flex flex-row p-12 gap-1 text-white bg-black/80 absolute top-0 left-0 w-full h-[810px] z-10 items-center">
                    <div class="rounded-lg">
                        <img class="max-w-72 max-h-96 rounded-t-lg"
                            :src="`https://image.tmdb.org/t/p/original${details?.poster_path}`" alt="Movie poster">
                        <div class="bg-sky-800 py-2 px-4 rounded-b-lg cursor-pointer">
                            <a class="cursor-pointer" :href="details?.homepage" target="_blank">Assistir</a>
                        </div>
                    </div>
                    <div class="flex-flex-col py-4 px-12">
                        <h1 class="text-4xl font-bold mt-12">{{ details?.name }} <span
                                class="font-thin text-gray-500">{{
                    details?.first_air_date ? `(${format(new
                        Date(details.first_air_date),
                        'yyyy')})` : '' }}</span></h1>
                        <div class="my-2">
                            <span>{{ details?.genres?.map((item: any) => item.name)?.join(', ') }}</span>
                        </div>
                        <h2 class="text-xl font-semibold my-2">Avaliação: {{ details?.vote_average?.toFixed(2) }}/10
                        </h2>
                        <h3 class="text-xl font-thin italic mb-4">{{ details?.tagline }}</h3>
                        <div>
                            <h3 class="text-xl font-semibold">Sinopse</h3>
                            <p class="text-md">{{ details?.overview }}</p>
                        </div>
                        <div class="flex mt-6 gap-12">
                            <div v-for="creator in details?.created_by" :key="creator.id">
                                <p class="text-md font-semibold">{{ creator.name }}</p>
                                <p class="text-md">Criação</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-8">
                <h2 class="text-2xl font-semibold mt-8 ml-8">Elenco principal</h2>
                <div class="flex flex-row gap-4 overflow-x-auto mt-4 pl-8 min-h-80">
                    <div v-for="actor in credits?.cast" :key="actor.id" class="max-w-36">
                        <div class="flex flex-col items-center border border-gray-100 rounded-lg h-80 drop-shadow-md">
                            <img class="w-36 h-52 rounded-t-lg"
                                :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`" alt="Actor">
                            <div class="px-4">
                                <p class="text-sm font-semibold mt-2">{{ actor.name }}</p>
                                <p class="text-sm">{{ actor.character }}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>