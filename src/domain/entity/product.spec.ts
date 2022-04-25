import { describe, expect, it } from '@jest/globals'

import { Product } from './'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrowError('Name is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrowError('Price is must be greater than zero')
  })

  it('should change name', () => {
    const name = 'Product 1'
    const product = new Product('1', name, 100)
    expect(product.name).toBe(name)

    const newName = 'Product 2'
    product.changeName(newName)
    expect(product.name).toBe(newName)
  })

  it('should change price', () => {
    const price = 100
    const product = new Product('1', 'Product 1', price)
    expect(product.price).toBe(price)

    const newPrice = 200
    product.changePrice(newPrice)
    expect(product.price).toBe(newPrice)
  })
})
