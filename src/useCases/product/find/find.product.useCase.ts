import { ProductRepositoryInterface } from '@/domain/product/repository/productRepositoryInterface'
import { InputFindProductDto, OutputFindProductDTO } from './find.product.dto'

export class FindProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute({ id }: InputFindProductDto): Promise<OutputFindProductDTO> {
    const product = await this.productRepository.find(id)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
