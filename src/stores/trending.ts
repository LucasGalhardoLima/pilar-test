import axios from 'axios'
import { defineStore } from 'pinia'

export const useTrendingStore = defineStore('trending', () => {
  const trending = axios.create({
    baseURL: 'https://api.themoviedb.org/3/trending'
  })

  async function fetchTrending() {
    const response = await trending.get('/all/day', {
      params: {
        api_key: 'ee91c6d5af59b60483bf56a8c9644f68',
        language: 'en-US'
      }
    })
    return response.data.results
  }

  return { fetchTrending }
})
