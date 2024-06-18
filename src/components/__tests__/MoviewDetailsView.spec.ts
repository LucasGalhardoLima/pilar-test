import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import MovieDetailsView from '../MovieDetailsView.vue'

describe('MovieDetailsView', () => {
  test('renders movie details correctly', () => {
    const details = {
      backdrop_path: '/path/to/backdrop.jpg',
      poster_path: '/path/to/poster.jpg',
      homepage: 'https://example.com',
      title: 'Example Movie',
      release_date: '2023-01-01',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      runtime: 120,
      vote_average: 8.5,
      tagline: 'An example tagline',
      overview: 'An example overview',
      created_by: [{ id: 1, name: 'Creator One' }]
    }

    const credits = {
      cast: [
        {
          id: 1,
          name: 'Actor One',
          character: 'Character One',
          profile_path: '/path/to/actor1.jpg'
        },
        {
          id: 2,
          name: 'Actor Two',
          character: 'Character Two',
          profile_path: '/path/to/actor2.jpg'
        }
      ]
    }

    const wrapper = mount(MovieDetailsView, {
      props: { details, credits }
    })

    expect(wrapper.find('h1').text()).toContain('Example Movie')
    expect(wrapper.find('h2').text()).toContain('Avaliação: 8.50/10')
    expect(wrapper.find('h3').text()).toContain('An example tagline')
    expect(wrapper.find('p').text()).toContain('An example overview')
  })
})
