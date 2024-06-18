<script setup lang="ts">
import { format } from 'date-fns';
import { useRoute } from 'vue-router';
import { toHoursAndMinutes } from '../utils/helpers';

defineProps({
    title: String,
    name: String,
    release_date: String,
    first_air_date: String,
    genres: Array,
    runtime: Number,
    vote_average: Number,
    tagline: String,
    overview: String,
    created_by: {
        type: Array<{
            id: number;
            name: string;
        }>,
        default: () => []
    }
});

const route = useRoute();
</script>

<template>
    <div class="flex-flex-col py-4 px-12">
        <h1 v-if="title" class="text-4xl font-bold mt-12">{{ title }} <span class="font-thin text-gray-500">{{
            release_date ? `(${format(new
                Date(release_date),
                'yyyy')})` : '' }}</span></h1>
        <h1 v-if="name" class="text-4xl font-bold mt-12">{{ name }} <span class="font-thin text-gray-500">{{
            first_air_date ? `(${format(new
                Date(first_air_date),
                'yyyy')})` : '' }}</span></h1>
        <div v-if="route.query.media_type === 'movie'" class="my-2">
            <span>{{ release_date ? `${format(new Date(release_date),
            'dd/MM/yyyy')}` : '' }}</span>
            {{ '-' }}
            <span>{{ genres?.map((item: any) => item.name)?.join(', ') }}</span>
            {{ '-' }}
            <span>{{ toHoursAndMinutes(runtime) }}</span>
        </div>
        <div v-else-if="route.query.media_type === 'tv'" class="my-2">
            <span>{{ genres?.map((item: any) => item.name)?.join(', ') }}</span>
        </div>
        <h2 v-if="vote_average" class="text-xl font-semibold my-2">Avaliação: {{
            vote_average.toFixed(2) }}/10
        </h2>
        <h3 class="text-xl font-thin italic mb-4">{{ tagline }}</h3>
        <div>
            <h3 class="text-xl font-semibold">Sinopse</h3>
            <p class="text-md">{{ overview }}</p>
        </div>
        <div v-if="created_by" class="flex mt-6 gap-12">
            <div v-for="creator in created_by" :key="creator.id">
                <p class="text-md font-semibold">{{ creator.name }}</p>
                <p class="text-md">Criação</p>
            </div>
        </div>
    </div>
</template>