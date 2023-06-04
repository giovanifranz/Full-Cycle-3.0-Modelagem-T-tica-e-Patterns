import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { UpdateProductUseCase } from './update.product.useCase'
import {
  InputUpdateProductDto,
  OutputUpdateProductDTO,
} from './update.product.dto'
import {
  ProductModel,
  ProductRepository,
} from '@/infra/product/repository/sequelize'
import { ProductFactory } from '@/domain/product/factory'

describe('Integration test update product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update product', async () => {
    const productRepository = new ProductRepository()
    const useCase = new UpdateProductUseCase(productRepository)

    const product = ProductFactory.create({
      name: 'Product',
      price: 400,
      type: 'a',
    })

    await productRepository.create(product)

    const input: InputUpdateProductDto = {
      id: product.id,
      name: 'Product Updated',
      price: 200,
    }

    const output: OutputUpdateProductDTO = {
      id: product.id,
      name: 'Product Updated',
      price: 200,
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
