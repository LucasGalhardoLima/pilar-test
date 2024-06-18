import { beforeEach, describe, expect, it, vi } from 'vitest'
import { API } from '@/utils/axios'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchStore } from '../search'

// mock API
vi.mock('@/utils/axios')

describe('popular store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return a list of search results when API call is successful', async () => {
    const { fetchSearch } = useSearchStore()
    const mockResults = [
      { title: 'Movie 1', release_date: '2023-01-01' },
      { title: 'Movie 2', release_date: '2023-02-01' }
    ]

    API.get = vi.fn().mockResolvedValue({ data: { results: mockResults } })

    const result = await fetchSearch('query')

    expect(result).toEqual(mockResults)
    expect(API.get).toHaveBeenCalledWith('search/multi', {
      params: { language: 'pt-BR', query: 'query', include_adult: true }
    })
  })

  it('should handle empty response gracefully when API returns no results', async () => {
    const { fetchSearch } = useSearchStore()

    API.get = vi.fn().mockResolvedValue({ data: { results: [] } })

    const result = await fetchSearch('query')

    expect(result).toEqual([])
    expect(API.get).toHaveBeenCalledWith('search/multi', {
      params: { language: 'pt-BR', query: 'query', include_adult: true }
    })
  })
})
