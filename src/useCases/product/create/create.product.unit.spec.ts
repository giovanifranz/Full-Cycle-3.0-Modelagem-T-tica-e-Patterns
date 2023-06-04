import { describe, it, expect, jest } from '@jest/globals'
import { InputCreateProductDto } from './create.product.dto'
import { ProductRepository } from '@/infra/product/repository/sequelize'
import { CreateProductUseCase } from './create.product.useCase'

const productA: InputCreateProductDto = {
  name: 'Product A',
  price: 100,
  type: 'a',
}

const productB: InputCreateProductDto = {
  name: 'Product B',
  price: 100,
  type: 'b',
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test create product use case', () => {
  it('should create a product type A', async () => {
    const productRepository = MockRepository()
    const useCase = new CreateProductUseCase(
      productRepository as ProductRepository,
    )

    const output = await useCase.execute(productA)

    expect(output).toEqual({
      id: expect.any(String),
      name: productA.name,
      price: productA.price,
    })
  })

  it('should create a product type b', async () => {
    const productRepository = MockRepository()
    const useCase = new CreateProductUseCase(
      productRepository as ProductRepository,
    )

    const output = await useCase.execute(productB)

    expect(output).toEqual({
      id: expect.any(String),
      name: productB.name,
      price: productB.price * 2,
    })
  })
})
