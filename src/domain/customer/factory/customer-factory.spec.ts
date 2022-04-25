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
    const address = new Address('Street', 1, 'Zip', 'City')
    const customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toStrictEqual(address)
  })
})
