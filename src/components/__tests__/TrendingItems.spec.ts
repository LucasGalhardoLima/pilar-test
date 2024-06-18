import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import TrendingComponent from '../TrendingItems.vue'
import { useTrendingStore } from '@/stores/trending'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('TrendingComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('fetch_trending_called_on_mount', async () => {
    const fetchTrendingMock = vi.fn()
    const trendingStore = useTrendingStore()
    trendingStore.fetchTrending = fetchTrendingMock

    mount(TrendingComponent)

    expect(fetchTrendingMock).toHaveBeenCalled()
  })

  test('trending_items_rendered', async () => {
    const trendingStore = useTrendingStore()
    trendingStore.fetchTrending = vi.fn().mockResolvedValue([
      {
        id: 1,
        media_type: 'movie',
        name: 'Movie 1',
        title: 'Movie 1',
        poster_path: '/poster1.jpg',
        first_air_date: '2021-01-01',
        release_date: '2021-01-01',
        vote_average: 7.5
      }
    ])

    const wrapper = mount(TrendingComponent)

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Movie 1')
    })
  })
})
