import { describe, expect, it } from '@jest/globals'

import { Address } from './address'

describe('Address value object unit tests', () => {
  it('should create an address', () => {
    const address = new Address({
      street: 'Street',
      number: 1,
      zip: 'Zip',
      city: 'City',
    })

    expect(address.street).toBe('Street')
    expect(address.number).toBe(1)
    expect(address.zip).toBe('Zip')
    expect(address.city).toBe('City')
  })

  it('should throw an error if street is empty', () => {
    expect(
      () =>
        new Address({
          street: '',
          number: 1,
          zip: 'Zip',
          city: 'City',
        }),
    ).toThrowError('Street is required')
  })

  it('should throw an error if number is equal to or less than zero', () => {
    expect(
      () =>
        new Address({
          street: 'Street',
          number: 0,
          zip: 'Zip',
          city: 'City',
        }),
    ).toThrowError('Number must be greater than zero')
  })

  it('should throw an error if zip is empty', () => {
    expect(
      () =>
        new Address({
          street: 'Street',
          number: 1,
          zip: '',
          city: 'City',
        }),
    ).toThrowError('Zip is required')
  })

  it('should throw an error if city is empty', () => {
    expect(
      () =>
        new Address({
          street: 'Street',
          number: 1,
          zip: 'Zip',
          city: '',
        }),
    ).toThrowError('City is required')
  })
})
