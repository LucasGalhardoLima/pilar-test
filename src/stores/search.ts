import { defineStore } from 'pinia'
import { API } from '@/utils/axios'
import type { LocationQueryValue } from 'vue-router'

export const useSearchStore = defineStore('search', () => {
  async function fetchSearch(query: string | LocationQueryValue[]) {
    const response = await API.get('search/multi', {
      params: {
        query,
        include_adult: true,
        language: 'pt-BR'
      }
    })

    return response.data.results
  }

  return { fetchSearch }
})
