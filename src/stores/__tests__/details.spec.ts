import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDetailsStore } from '../details'
import { API } from '@/utils/axios'
import { setActivePinia, createPinia } from 'pinia'

// mock API
vi.mock('@/utils/axios')

describe('details store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should fetch movie details successfully when given a valid movie ID', async () => {
    const { fetchMovieDetails } = useDetailsStore()
    const mockMovieDetails = {
      title: 'Example Movie',
      release_date: '2023-01-01',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      runtime: 120,
      vote_average: 8.5,
      tagline: 'An example tagline',
      overview: 'An example overview'
    }

    API.get = vi.fn().mockResolvedValue({ data: mockMovieDetails })

    const result = await fetchMovieDetails('123')

    expect(result).toEqual(mockMovieDetails)
    expect(API.get).toHaveBeenCalledWith('movie/123', { params: { language: 'pt-BR' } })
  })

  it('should return an error when given an invalid movie ID', async () => {
    const { fetchMovieDetails } = useDetailsStore()

    API.get = vi.fn().mockRejectedValue(new Error('Movie not found'))

    await expect(fetchMovieDetails('invalid-id')).rejects.toThrow('Movie not found')
    expect(API.get).toHaveBeenCalledWith('movie/invalid-id', { params: { language: 'pt-BR' } })
  })

  it('should fetch tv show details successfully when given a valid tv show ID', async () => {
    const { fetchTvShowDetails } = useDetailsStore()
    const mockTvShowDetails = {
      name: 'Example Show',
      first_air_date: '2023-01-01',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      vote_average: 8.5,
      tagline: 'An example tagline',
      overview: 'An example overview'
    }

    API.get = vi.fn().mockResolvedValue({ data: mockTvShowDetails })

    const result = await fetchTvShowDetails('123')

    expect(result).toEqual(mockTvShowDetails)
    expect(API.get).toHaveBeenCalledWith('tv/123', { params: { language: 'pt-BR' } })
  })

  it('should return an error when given an invalid tv show ID', async () => {
    const { fetchTvShowDetails } = useDetailsStore()

    API.get = vi.fn().mockRejectedValue(new Error('TV show not found'))

    await expect(fetchTvShowDetails('invalid-id')).rejects.toThrow('TV show not found')
    expect(API.get).toHaveBeenCalledWith('tv/invalid-id', { params: { language: 'pt-BR' } })
  })

  it('should fetch movie credits successfully when given a valid movie ID', async () => {
    const { fetchMovieCredits } = useDetailsStore()
    const mockMovieCredits = {
      cast: [
        { id: 1, name: 'Actor One', character: 'Character One' },
        { id: 2, name: 'Actor Two', character: 'Character Two' }
      ]
    }

    API.get = vi.fn().mockResolvedValue({ data: mockMovieCredits })

    const result = await fetchMovieCredits('123')

    expect(result).toEqual(mockMovieCredits)
    expect(API.get).toHaveBeenCalledWith('movie/123/credits', { params: { language: 'pt-BR' } })
  })

  it('should return an error when given an invalid movie ID', async () => {
    const { fetchMovieCredits } = useDetailsStore()

    API.get = vi.fn().mockRejectedValue(new Error('Movie not found'))

    await expect(fetchMovieCredits('invalid-id')).rejects.toThrow('Movie not found')
    expect(API.get).toHaveBeenCalledWith('movie/invalid-id/credits', {
      params: { language: 'pt-BR' }
    })
  })

  it('should fetch tv show credits successfully when given a valid tv show ID', async () => {
    const { fetchTvShowCredits } = useDetailsStore()
    const mockTvShowCredits = {
      cast: [
        { id: 1, name: 'Actor One', character: 'Character One' },
        { id: 2, name: 'Actor Two', character: 'Character Two' }
      ]
    }

    API.get = vi.fn().mockResolvedValue({ data: mockTvShowCredits })

    const result = await fetchTvShowCredits('123')

    expect(result).toEqual(mockTvShowCredits)
    expect(API.get).toHaveBeenCalledWith('tv/123/credits', { params: { language: 'pt-BR' } })
  })

  it('should return an error when given an invalid tv show ID', async () => {
    const { fetchTvShowCredits } = useDetailsStore()

    API.get = vi.fn().mockRejectedValue(new Error('TV show not found'))

    await expect(fetchTvShowCredits('invalid-id')).rejects.toThrow('TV show not found')
    expect(API.get).toHaveBeenCalledWith('tv/invalid-id/credits', {
      params: { language: 'pt-BR' }
    })
  })
})
