import { ValidatorInterface } from '@/domain/@shared/validator/validator.interface'
import { ProductZodValidator } from '../validator/product.zod.validator'
import { ProductInterface } from '../entity'

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductZodValidator()
  }
}
