<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailsStore } from '@/stores/details';

const route = useRoute();
const detailsStore = useDetailsStore();

const details = ref<any>({});

const fetchDetails = async () => {
    // await detailsStore.fetchDetails($route.params.id, $route.query.media_type);
    if (route.query.media_type === 'movie') {
        details.value = await detailsStore.fetchMovieDetails(route.params.id);
    } else if (route.query.media_type === 'tv') {
        details.value = await detailsStore.fetchTvShowDetails(route.params.id);
    }
};

onMounted(() => {
    fetchDetails()
});
</script>

<template>
    <main>
        <section class="h-46">
            <div class=""> <img class="absolute -z-50 bg-left bg-no-repeat bg-cover w-full h-full"
                    :src="`https://image.tmdb.org/t/p/original${details.backdrop_path}`" alt="Backdrop" /></div>

            <div>
                <h1>Detail View</h1>
                <p>Detail view for {{ $route.params.id }}</p>
                <p>Query: {{ $route.query.media_type }}</p>
            </div>

        </section>
    </main>
</template>