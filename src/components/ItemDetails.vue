<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router';
import { format } from 'date-fns';
import { toHoursAndMinutes } from '../utils/helpers';
import { defineProps } from 'vue';

type MediaType = LocationQueryValue | LocationQueryValue[];

interface Props {
    media_type: MediaType;
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
}

defineProps<Props>();

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
        <div v-if="media_type === 'movie'" class="my-2">
            <span>{{ release_date ? `${format(new Date(release_date),
            'dd/MM/yyyy')}` : '' }}</span>
            {{ '-' }}
            <span>{{ genres?.map((item: any) => item.name)?.join(', ') }}</span>
            {{ '-' }}
            <span>{{ toHoursAndMinutes(runtime) }}</span>
        </div>
        <div v-else-if="media_type === 'tv'" class="my-2">
            <span id="genres" data-test="genres">{{ genres?.map((item: any) => item.name)?.join(', ') }}</span>
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