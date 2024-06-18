import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import DetailsPoster from '../DetailsPoster.vue'

describe('DetailsPoster', () => {
  test('renders image with provided posterLink', () => {
    const wrapper = mount(DetailsPoster, {
      props: {
        posterLink: 'https://example.com/poster.jpg',
        website: 'https://example.com'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/poster.jpg')
  })

  test('renders correctly with empty posterLink', () => {
    const wrapper = mount(DetailsPoster, {
      props: {
        posterLink: '',
        website: 'https://example.com'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://blocks.astratic.com/img/general-img-portrait.png')
  })
})
