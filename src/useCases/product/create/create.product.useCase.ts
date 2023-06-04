import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create.product.dto'
import { ProductFactory } from '@/domain/product/factory'
import { ProductRepositoryInterface } from '@/domain/product/repository/productRepositoryInterface'

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create({
      name: input.name,
      price: input.price,
      type: input.type,
    })

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
