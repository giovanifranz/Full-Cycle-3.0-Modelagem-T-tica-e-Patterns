import { describe, it, expect, jest } from '@jest/globals'
import { ListProductUseCase } from './list.product.useCase'
import { ProductFactory } from '@/domain/product/factory'
import { ProductRepository } from '@/infra/product/repository/sequelize'

const productA = ProductFactory.create({
  name: 'Product A',
  price: 200,
  type: 'a',
})

const productB = ProductFactory.create({
  name: 'Product B',
  price: 400,
  type: 'b',
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test list product use case', () => {
  it('should list a product', async () => {
    const productRepository = MockRepository()
    const useCase = new ListProductUseCase(
      productRepository as ProductRepository,
    )

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(productA.id)
    expect(output.products[0].name).toBe(productA.name)
    expect(output.products[0].price).toBe(productA.price)

    expect(output.products[1].id).toBe(productB.id)
    expect(output.products[1].name).toBe(productB.name)
    expect(output.products[1].price).toBe(productB.price)
  })
})
