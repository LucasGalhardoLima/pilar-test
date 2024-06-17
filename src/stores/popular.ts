import axios from 'axios'
import { defineStore } from 'pinia'

export const usePopularStore = defineStore('popular', () => {
  const popular = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
  })

  async function fetchPopularMovies() {
    const response = await popular.get('/movie/popular', {
      params: {
        api_key: 'ee91c6d5af59b60483bf56a8c9644f68',
        language: 'en-US'
      }
    })
    return response.data.results
  }

  async function fetchPopularTvShows() {
    const response = await popular.get('/tv/popular', {
      params: {
        api_key: 'ee91c6d5af59b60483bf56a8c9644f68'
      }
    })
    return response.data.results
  }

  return { fetchPopularMovies, fetchPopularTvShows }
})
