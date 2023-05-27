import { Customer } from '@/domain/customer/entity'
import { Address } from '@/domain/customer/value-object'
import { CustomerRepository } from '@/infra/customer/repository/sequelize'
import { describe, it, expect, jest } from '@jest/globals'
import { FindCustomerUseCase } from './find.customer.useCase'
import {
  InputFindCustomerDto,
  OutputFindCustomerDTO,
} from './find.customer.dto'

const customer = new Customer('123', 'John')
const address = new Address('Street', 123, 'Zip', 'City')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test find customer use case', () => {
  it('should find customer by id', async () => {
    const customerRepository = MockRepository()
    const useCase = new FindCustomerUseCase(
      customerRepository as CustomerRepository,
    )

    await customerRepository.create(customer)

    const input: InputFindCustomerDto = {
      id: '123',
    }

    const output: OutputFindCustomerDTO = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        city: 'City',
        zip: 'Zip',
      },
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const errorMessage = 'Customer not found'

    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    const useCase = new FindCustomerUseCase(
      customerRepository as CustomerRepository,
    )

    await customerRepository.create(customer)

    const input: InputFindCustomerDto = {
      id: '123',
    }

    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow(errorMessage)
  })
})
