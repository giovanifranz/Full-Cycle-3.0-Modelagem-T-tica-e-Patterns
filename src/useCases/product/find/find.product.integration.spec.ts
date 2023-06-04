import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import {
  ProductModel,
  ProductRepository,
} from '@/infra/product/repository/sequelize'
import { ProductFactory } from '@/domain/product/factory'
import { OutputFindProductDTO } from './find.product.dto'
import { FindProductUseCase } from './find.product.useCase'

describe('Integration test find product use case', () => {
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

  it('should find product by id', async () => {
    const productRepository = new ProductRepository()
    const useCase = new FindProductUseCase(productRepository)

    const product = ProductFactory.create({
      name: 'Product',
      price: 100,
      type: 'a',
    })

    await productRepository.create(product)

    const output: OutputFindProductDTO = {
      id: product.id,
      name: product.name,
      price: product.price,
    }

    const result = await useCase.execute({ id: product.id })

    expect(result).toEqual(output)
  })
})
