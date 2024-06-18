import { defineStore } from 'pinia'
import { API } from '@/utils/axios'

export const useDetailsStore = defineStore('details', () => {
  async function fetchMovieDetails(id: string | string[]) {
    const response = await API.get(`movie/${id}`, {
      params: {
        language: 'pt-BR'
      }
    })
    return response.data
  }

  async function fetchMovieCredits(id: string | string[]) {
    const response = await API.get(`movie/${id}/credits`, {
      params: {
        language: 'pt-BR'
      }
    })
    return response.data
  }

  async function fetchTvShowDetails(id: string | string[]) {
    const response = await API.get(`tv/${id}`, {
      params: {
        language: 'pt-BR'
      }
    })
    return response.data
  }

  async function fetchTvShowCredits(id: string | string[]) {
    const response = await API.get(`tv/${id}/credits`, {
      params: {
        language: 'pt-BR'
      }
    })
    return response.data
  }

  return { fetchMovieDetails, fetchTvShowDetails, fetchMovieCredits, fetchTvShowCredits }
})
