import { describe, it, expect, jest } from '@jest/globals'
import { ProductRepository } from '@/infra/product/repository/sequelize'
import { randomUUID } from 'node:crypto'
import { OutputFindProductDTO } from './find.product.dto'
import { FindProductUseCase } from './find.product.useCase'

const uuid = randomUUID()

const product: OutputFindProductDTO = {
  id: uuid,
  name: 'Product',
  price: 100,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const useCase = new FindProductUseCase(
      productRepository as ProductRepository,
    )

    const output = await useCase.execute({
      ...product,
    })

    expect(output).toEqual({
      id: uuid,
      name: product.name,
      price: product.price,
    })
  })
})
