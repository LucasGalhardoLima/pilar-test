<script setup lang="ts">
import { defineProps } from 'vue';

import DetailsPoster from './DetailsPoster.vue';
import ItemDetails from './ItemDetails.vue';
import CastDetails from './CastDetails.vue';

interface Props {
    details: {
        title: string;
        name: string;
        release_date: string;
        first_air_date: string;
        genres: Array<{
            id: number;
            name: string;
        }>;
        runtime: number;
        vote_average: number;
        tagline: string;
        overview: string;
        created_by: Array<{
            id: number;
            name: string;
        }>;
        backdrop_path: string;
        poster_path: string;
        homepage: string;
    },
    credits: {
        cast: Array<
            {
                id: number;
                name: string;
                profile_path: string;
                character: string;
            }
        >
    }
}

defineProps<Props>();


</script>

<template>
    <section class="w-full h-5/6">
        <div class="flex flex-col">
            <div>
                <img :src="`https://image.tmdb.org/t/p/original${details?.backdrop_path}`" alt="Movie poster"
                    loading="lazy" height="705"
                    class="w-full z-0 max-h-[810px] bg-right-bottom bg-contain aspect-video">
                <div
                    class="flex flex-row p-12 gap-1 text-white bg-black/80 absolute top-0 left-0 w-full h-[810px] z-10 items-center">
                    <DetailsPoster :posterLink="`https://image.tmdb.org/t/p/original${details?.poster_path}`"
                        :website="details?.homepage" />
                    <ItemDetails v-bind="details" :media_type="$route?.query?.media_type" />
                </div>
            </div>
            <CastDetails :credits="credits" />
        </div>
    </section>
</template>