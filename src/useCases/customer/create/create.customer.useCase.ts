import { CustomerRepositoryInterface } from '@/domain/customer/repository/customerRepositoryInterface'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'
import { Address } from '@/domain/customer/value-object'

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: InputCreateCustomerDto,
  ): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress({
      name: input.name,
      address: new Address(input.address),
    })

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    }
  }
}
