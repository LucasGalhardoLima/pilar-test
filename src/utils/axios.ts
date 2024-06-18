import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'ee91c6d5af59b60483bf56a8c9644f68'
  }
})
