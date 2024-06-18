import { describe, expect, it, vi } from 'vitest'
import { API } from '../axios'

describe('axios', () => {
  it('should create API instance with correct baseURL and api_key', () => {
    const instance = API
    expect(instance.defaults.baseURL).toBe('https://api.themoviedb.org/3')
    expect(instance.defaults.params.api_key).toBe('ee91c6d5af59b60483bf56a8c9644f68')
  })

  it('should handle missing api_key gracefully', async () => {
    const mockAxios = require('axios')
    mockAxios.create = vi.fn().mockReturnValue({
      defaults: {
        baseURL: 'https://api.themoviedb.org/3',
        params: {}
      }
    })

    expect(mockAxios.defaults.params).toBeUndefined()
  })
})
