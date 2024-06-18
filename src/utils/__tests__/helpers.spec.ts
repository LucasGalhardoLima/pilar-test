import { describe, expect, it } from 'vitest'
import { toHoursAndMinutes } from '../helpers'

describe('helpers', () => {
  it('should convert total minutes to hours and minutes correctly when input is greater than zero', () => {
    const result = toHoursAndMinutes(125)
    expect(result).toBe('2h 5m')
  })

  it('should return an empty string when input is zero', () => {
    const result = toHoursAndMinutes(0)
    expect(result).toBe('')
  })
})
