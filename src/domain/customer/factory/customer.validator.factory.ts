import { ValidatorInterface } from '@/domain/@shared/validator/validator.interface'
import { CustomerZodValidator } from '../validator/customer.zod.validator'
import { Customer } from '../entity'

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerZodValidator()
  }
}
