import { describe, expect, it } from '@jest/globals'

import { ProductFactory } from './product-factory'
describe('Product factory unit test', () => {
  it('should create a product type a', () => {
    const product = ProductFactory.create({
      name: 'Product A',
      price: 1,
      type: 'a',
    })

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(1)
    expect(product.constructor.name).toBe('Product')
  })

  it('should create a product type b', () => {
    const product = ProductFactory.create({
      name: 'Product B',
      price: 1,
      type: 'b',
    })

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(2)
    expect(product.constructor.name).toBe('ProductB')
  })

  it('should throw an error when product type is not supported', () => {
    expect(() =>
      ProductFactory.create({
        name: 'Product C',
        price: 1,
        type: 'c',
      }),
    ).toThrowError('Product type not supported')
  })
})
