<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const searchString = ref<string>('');

const goToSearchPage = () => {
    router.push({ name: 'search', query: { query: searchString.value } });
};

function handleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    searchString.value = value;
}

</script>

<template>
    <div class="flex">
        <input class="h-12 appearance-none outline-none bg-white rounded-full p-2 flex-1 pl-6" type="text"
            placeholder="Buscar por um Filme, Série ou Pessoa..." :value="searchString" @input="handleChange"
            @keydown.enter="goToSearchPage" />
        <button id="search-button"
            class="bg-gradient-to-r from-violet-500 to-fuchsia-500 py-2 px-4 rounded-full text-white -ml-12 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
            @click="goToSearchPage">Buscar</button>
    </div>
</template>