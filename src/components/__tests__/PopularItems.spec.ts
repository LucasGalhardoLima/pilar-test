import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { usePopularStore } from '@/stores/popular'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import PopularItems from '../PopularItems.vue'

describe('PopularItems', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('fetch_popular_movies_called_on_mount', async () => {
    const fetchPopularMoviesMock = vi.fn()
    const popularStore = usePopularStore()
    popularStore.fetchPopularMovies = fetchPopularMoviesMock

    mount(PopularItems, {
      props: {
        popularFilter: 'movies'
      }
    })

    expect(fetchPopularMoviesMock).toHaveBeenCalled()
  })

  test('popular_data_null_error_message_displayed', async () => {
    const popularStore = usePopularStore()
    popularStore.fetchPopularMovies = vi.fn().mockResolvedValue(null)

    const wrapper = mount(PopularItems, {
      props: {
        popularFilter: 'movies'
      }
    })

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Erro ao carregar os dados')
    })
  })
})
