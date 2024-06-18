import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'

import SearchInput from '../SearchInput.vue'

describe('SearchInput', () => {
  it('input field updates searchString when user types', async () => {
    const wrapper = mount(SearchInput) as any
    const input = wrapper.find('input')

    await input.setValue('test query')
    await nextTick()

    expect(wrapper.vm?.searchString).toBe('test query')
  })

  it('input field handles empty string correctly', async () => {
    const wrapper = mount(SearchInput) as any
    const input = wrapper.find('input')

    await input.setValue('')
    await nextTick()

    expect(wrapper.vm.searchString).toBe('')
  })
})
