import { describe, expect, it } from '@jest/globals'

import { Address } from './address'

describe('Address value object unit tests', () => {
  it('should create an address', () => {
    const address = new Address('Street', 1, 'Zip', 'City')

    expect(address.street).toBe('Street')
    expect(address.number).toBe(1)
    expect(address.zip).toBe('Zip')
    expect(address.city).toBe('City')
  })

  it('should throw an error if street is empty', () => {
    expect(() => new Address('', 1, 'Zip', 'City')).toThrowError(
      'Street is required',
    )
  })

  it('should throw an error if number is equal to or less than zero', () => {
    expect(() => new Address('Street', 0, 'Zip', 'City')).toThrowError(
      'Number must be greater than zero',
    )
  })

  it('should throw an error if zip is empty', () => {
    expect(() => new Address('Street', 1, '', 'City')).toThrowError(
      'Zip is required',
    )
  })

  it('should throw an error if city is empty', () => {
    expect(() => new Address('Street', 1, 'Zip', '')).toThrowError(
      'City is required',
    )
  })
})
