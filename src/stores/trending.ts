import { defineStore } from 'pinia'
import { API } from '@/utils/axios'

export const useTrendingStore = defineStore('trending', () => {
  async function fetchTrending() {
    const response = await API.get('/trending/all/day', {
      params: {
        language: 'pt-BR'
      }
    })
    return response.data.results
  }

  return { fetchTrending }
})
