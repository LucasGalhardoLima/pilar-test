import { defineStore } from 'pinia'
import { API } from '@/utils/axios'

export const usePopularStore = defineStore('popular', () => {
  async function fetchPopularMovies() {
    const response = await API.get('/movie/popular', {
      params: {
        language: 'en-US'
      }
    })
    return response.data.results
  }

  async function fetchPopularTvShows() {
    const response = await API.get('/tv/popular', {
      params: {
        language: 'en-US'
      }
    })
    return response.data.results
  }

  return { fetchPopularMovies, fetchPopularTvShows }
})
