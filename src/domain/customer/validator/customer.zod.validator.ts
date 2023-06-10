import { ValidatorInterface } from '@/domain/@shared/validator/validator.interface'
import { Customer } from '../entity'
import { z } from 'zod'

export class CustomerZodValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      const customerSchema = z.object({
        id: z.string().nonempty('Id is required'),
        name: z.string().nonempty('Name is required'),
      })
      customerSchema.parse(entity)
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          console.log(error)
          entity._notification.addError({
            context: 'customer',
            message: error.message,
          })
        })
      }
    }
  }
}
