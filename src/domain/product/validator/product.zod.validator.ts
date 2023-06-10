import { ValidatorInterface } from '@/domain/@shared/validator/validator.interface'
import { Product } from '../entity'
import { z } from 'zod'

export class ProductZodValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      const productSchema = z.object({
        id: z.string().nonempty('Id is required'),
        name: z.string().nonempty('Name is required'),
        price: z.number().positive('Price must be greater than zero'),
      })
      productSchema.parse(entity)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          console.log(error)
          entity._notification.addError({
            context: 'product',
            message: error.message,
          })
        })
      }
    }
  }
}
