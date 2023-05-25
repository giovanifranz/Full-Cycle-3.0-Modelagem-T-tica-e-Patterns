import { CustomerRepositoryInterface } from '@/domain/customer/repository/customerRepositoryInterface'
import {
  InputFindCustomerDto,
  OutputFindCustomerDTO,
} from './find.customer.dto'

export class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute({ id }: InputFindCustomerDto): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(id)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
      },
    }
  }
}
