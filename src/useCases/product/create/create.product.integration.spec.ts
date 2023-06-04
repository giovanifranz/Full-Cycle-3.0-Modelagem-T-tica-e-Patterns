import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import {
  ProductModel,
  ProductRepository,
} from '@/infra/product/repository/sequelize'
import { CreateProductUseCase } from './create.product.useCase'
import { ProductFactory } from '@/domain/product/factory'
import { InputCreateProductDto } from './create.product.dto'

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

describe('Integration test create product use case', () => {
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

  it('should create a product A', async () => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const product = ProductFactory.create({
      name: productA.name,
      price: productA.price,
      type: productA.type,
    })

    await productRepository.create(product)

    const output = {
      id: expect.any(String),
      name: productA.name,
      price: productA.price,
    }

    const result = await useCase.execute(productA)

    expect(result).toEqual(output)
  })

  it('should create a product B', async () => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const product = ProductFactory.create({
      name: productB.name,
      price: productB.price,
      type: productB.type,
    })

    await productRepository.create(product)

    const output = {
      id: expect.any(String),
      name: productB.name,
      price: productB.price * 2,
    }

    const result = await useCase.execute(productB)

    expect(result).toEqual(output)
  })
})
