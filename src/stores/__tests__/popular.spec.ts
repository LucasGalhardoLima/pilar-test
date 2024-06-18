import { beforeEach, describe, expect, it, vi } from 'vitest'
import { API } from '@/utils/axios'
import { setActivePinia, createPinia } from 'pinia'
import { usePopularStore } from '../popular'

// mock API
vi.mock('@/utils/axios')

describe('popular store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should return a list of popular movies when API call is successful', async () => {
    const { fetchPopularMovies } = usePopularStore()
    const mockMovies = [
      { title: 'Movie 1', release_date: '2023-01-01' },
      { title: 'Movie 2', release_date: '2023-02-01' }
    ]

    API.get = vi.fn().mockResolvedValue({ data: { results: mockMovies } })

    const result = await fetchPopularMovies()

    expect(result).toEqual(mockMovies)
    expect(API.get).toHaveBeenCalledWith('/movie/popular', { params: { language: 'pt-BR' } })
  })

  it('should handle empty response gracefully when API returns no movies', async () => {
    const { fetchPopularMovies } = usePopularStore()

    API.get = vi.fn().mockResolvedValue({ data: { results: [] } })

    const result = await fetchPopularMovies()

    expect(result).toEqual([])
    expect(API.get).toHaveBeenCalledWith('/movie/popular', { params: { language: 'pt-BR' } })
  })

  it('should return a list of popular TV shows when API call is successful', async () => {
    const { fetchPopularTvShows } = usePopularStore()
    const mockTvShows = [
      { name: 'Show 1', first_air_date: '2023-01-01' },
      { name: 'Show 2', first_air_date: '2023-02-01' }
    ]

    API.get = vi.fn().mockResolvedValue({ data: { results: mockTvShows } })

    const result = await fetchPopularTvShows()

    expect(result).toEqual(mockTvShows)
    expect(API.get).toHaveBeenCalledWith('/tv/popular', { params: { language: 'pt-BR' } })
  })

  it('should handle empty response gracefully when API returns no TV shows', async () => {
    const { fetchPopularTvShows } = usePopularStore()

    API.get = vi.fn().mockResolvedValue({ data: { results: [] } })

    const result = await fetchPopularTvShows()

    expect(result).toEqual([])
    expect(API.get).toHaveBeenCalledWith('/tv/popular', { params: { language: 'pt-BR' } })
  })
})
