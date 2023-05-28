import { describe, expect, it } from '@jest/globals'

import { Address } from '../value-object'

import { CustomerFactory } from './customer-factory'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = new Address({
      street: 'Street',
      number: 1,
      zip: 'Zip',
      city: 'City',
    })

    const customer = CustomerFactory.createWithAddress({
      name: 'John',
      address,
    })

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toStrictEqual(address)
  })
})
