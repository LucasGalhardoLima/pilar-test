import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { format } from 'date-fns'

import ItemDetails from '../ItemDetails.vue'

const mockProps = {
  media_type: 'movie',
  title: 'Test Movie',
  name: '',
  release_date: '2022-01-01',
  first_air_date: '',
  genres: [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedy' }
  ],
  runtime: 120,
  vote_average: 7.5,
  tagline: 'Test tagline',
  overview: 'Test overview',
  created_by: [{ id: 1, name: 'Test creator' }]
}

describe('ItemDetails', () => {
  test('renders_title_with_release_year', () => {
    const wrapper = mount(ItemDetails, {
      props: mockProps
    })

    const titleElement = wrapper.find('h1')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toContain('Test Movie')
    expect(titleElement.text()).toContain(`(${format(new Date('2022-01-01'), 'yyyy')})`)
  })

  test('handles_missing_title_and_name_gracefully', () => {
    mockProps.title = ''
    mockProps.name = ''

    const wrapper = mount(ItemDetails, {
      props: mockProps
    })

    const titleElement = wrapper.find('h1')
    expect(titleElement.exists()).toBe(false)

    const nameElement = wrapper.find('h1')
    expect(nameElement.exists()).toBe(false)
  })

  test('renders_name_with_first_air_date', () => {
    mockProps.media_type = 'tv'
    mockProps.title = ''
    mockProps.name = 'Test TV Show'
    mockProps.release_date = ''
    mockProps.first_air_date = '2022-01-01'

    const wrapper = mount(ItemDetails, {
      props: mockProps
    })

    const nameElement = wrapper.find('h1')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toContain('Test TV Show')
    expect(nameElement.text()).toContain(`(${format(new Date('2022-01-01'), 'yyyy')})`)
  })

  test('displays_genres_for_tv_shows', () => {
    mockProps.media_type = 'tv'
    mockProps.title = ''
    mockProps.name = 'Test TV Show'
    mockProps.release_date = ''
    mockProps.first_air_date = '2022-01-01'
    mockProps.genres = [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Comedy' }
    ]

    const wrapper = mount(ItemDetails, {
      props: mockProps
    })

    const genresElement = wrapper.get('[data-test="genres"]')
    expect(genresElement.text()).toContain('Drama, Comedy')
  })
})
