import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import CastDetails from '../CastDetails.vue'

describe('CastDetails', () => {
  it('renders correctly with default empty credits object', () => {
    const wrapper = mount(CastDetails, {
      props: {
        credits: {
          cast: []
        }
      }
    })

    expect(wrapper.find('h2').text()).toBe('Elenco principal')
    expect(wrapper.findAll('div.min-w-36').length).toBe(0)
  })

  it('handles null or undefined credits object gracefully', () => {
    const wrapper = mount(CastDetails, {
      props: {
        credits: null
      }
    })

    expect(wrapper.find('h2').text()).toBe('Elenco principal')
    expect(wrapper.findAll('div.min-w-36').length).toBe(0)

    const wrapperUndefined = mount(CastDetails, {
      props: {
        credits: undefined
      }
    })

    expect(wrapperUndefined.find('h2').text()).toBe('Elenco principal')
    expect(wrapperUndefined.findAll('div.min-w-36').length).toBe(0)
  })
})
