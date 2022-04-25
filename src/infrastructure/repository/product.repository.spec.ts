import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'

import { Product } from '../../domain/entity'
import { ProductModel } from '../db/sequelize/model'
import { ProductRepository } from '../repository'

describe('Product repository test', () => {
  let sequilize: Sequelize

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequilize.addModels([ProductModel])
    await sequilize.sync()
  })

  afterEach(async () => {
    await sequilize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product_1', 100)
    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '123' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '123',
      name: 'Product_1',
      price: 100,
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product_1', 100)
    await productRepository.create(product)
    product.changeName('Product_2')
    product.changePrice(200)
    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: '123' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '123',
      name: 'Product_2',
      price: 200,
    })
  })

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product_1', 100)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({ where: { id: '123' } })
    const foundProduct = await productRepository.findById('123')

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    })
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product_1 = new Product('123', 'Product_1', 100)
    await productRepository.create(product_1)

    const product_2 = new Product('124', 'Product_2', 200)
    await productRepository.create(product_2)

    const foundProducts = await productRepository.findAll()
    const products = [product_1, product_2]

    expect(products.length).toBe(foundProducts.length)
    expect(products).toEqual(foundProducts)
  })
})
