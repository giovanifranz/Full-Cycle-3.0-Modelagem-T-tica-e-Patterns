import { CustomerRepositoryInterface } from '@/domain/customer/repository/customerRepositoryInterface'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDTO,
} from './update.customer.dto'
import { Address } from '@/domain/customer/value-object'

export class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: InputUpdateCustomerDto,
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)

    customer.changeName(input.name)
    customer.changeAddress(new Address(input.address))

    await this.customerRepository.update(customer)

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
