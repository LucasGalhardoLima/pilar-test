<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailsStore } from '@/stores/details';
import MovieDetailsView from '@/components/MovieDetailsView.vue';
import ShowDetailsView from '@/components/ShowDetailsView.vue';

const route = useRoute();
const detailsStore = useDetailsStore();

const details = ref<any>({});
const credits = ref<any>({});

const fetchDetails = async () => {
    if (route.query.media_type === 'movie') {
        details.value = await detailsStore.fetchMovieDetails(route.params.id);
        credits.value = await detailsStore.fetchMovieCredits(route.params.id);
    } else if (route.query.media_type === 'tv') {
        details.value = await detailsStore.fetchTvShowDetails(route.params.id);
        credits.value = await detailsStore.fetchTvShowCredits(route.params.id);
    }
};

onMounted(() => {
    fetchDetails()
});
</script>

<template>
    <main>
        <MovieDetailsView v-if="route.query.media_type === 'movie'" :details="details" :credits="credits" />
        <ShowDetailsView v-else-if="route.query.media_type === 'tv'" :details="details" :credits="credits" />
    </main>
</template>