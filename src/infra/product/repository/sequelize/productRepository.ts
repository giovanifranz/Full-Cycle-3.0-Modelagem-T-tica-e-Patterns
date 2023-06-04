import { Product, ProductInterface } from '@/domain/product/entity'
import { ProductRepositoryInterface } from '@/domain/product/repository/productRepositoryInterface'

import { ProductModel } from './productModel'

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      },
    )
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })

    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price),
    )
  }
}
