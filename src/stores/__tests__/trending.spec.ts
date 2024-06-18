import { beforeEach, describe, expect, it, vi } from 'vitest'
import { API } from '@/utils/axios'
import { setActivePinia, createPinia } from 'pinia'
import { useTrendingStore } from '../trending'

// mock API
vi.mock('@/utils/axios')

describe('trending store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return a list of trending movies and TV shows when API call is successful', async () => {
    const { fetchTrending } = useTrendingStore()
    const mockResults = [
      { title: 'Movie 1', release_date: '2023-01-01' },
      { name: 'Show 1', first_air_date: '2023-01-01' }
    ]

    API.get = vi.fn().mockResolvedValue({ data: { results: mockResults } })

    const result = await fetchTrending()

    expect(result).toEqual(mockResults)
    expect(API.get).toHaveBeenCalledWith('/trending/all/day', { params: { language: 'pt-BR' } })
  })

  it('should handle empty response gracefully when API returns no results', async () => {
    const { fetchTrending } = useTrendingStore()

    API.get = vi.fn().mockResolvedValue({ data: { results: [] } })

    const result = await fetchTrending()

    expect(result).toEqual([])
    expect(API.get).toHaveBeenCalledWith('/trending/all/day', { params: { language: 'pt-BR' } })
  })
})
