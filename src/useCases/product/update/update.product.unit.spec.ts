import { describe, it, expect, jest } from '@jest/globals'
import { ProductFactory } from '@/domain/product/factory'
import { InputUpdateProductDto } from './update.product.dto'
import { ProductRepository } from '@/infra/product/repository/sequelize'
import { UpdateProductUseCase } from './update.product.useCase'

const product = ProductFactory.create({
  name: 'Product',
  price: 400,
  type: 'a',
})

const input: InputUpdateProductDto = {
  id: product.id,
  name: 'Product Updated',
  price: 200,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test update product use case', () => {
  it('should update product', async () => {
    const productRepository = MockRepository()
    const useCase = new UpdateProductUseCase(
      productRepository as ProductRepository,
    )

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
