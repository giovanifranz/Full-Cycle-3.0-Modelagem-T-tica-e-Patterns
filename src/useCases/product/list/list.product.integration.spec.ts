import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'
import { ListProductUseCase } from './list.product.useCase'
import {
  ProductModel,
  ProductRepository,
} from '@/infra/product/repository/sequelize'
import { ProductFactory } from '@/domain/product/factory'

describe('Integration test list product use case', () => {
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

  it('should list product', async () => {
    const productRepository = new ProductRepository()
    const useCase = new ListProductUseCase(productRepository)

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

    await productRepository.create(productA)
    await productRepository.create(productB)

    const input: InputListProductDto = {}

    const output: OutputListProductDto = {
      products: [
        {
          id: productA.id,
          name: productA.name,
          price: productA.price,
        },
        {
          id: productB.id,
          name: productB.name,
          price: productB.price,
        },
      ],
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
