import { Address } from '@/domain/customer/value-object'
import { CustomerRepository } from '@/infra/customer/repository/sequelize'
import { describe, it, expect, jest } from '@jest/globals'
import { FindCustomerUseCase } from './find.customer.useCase'
import {
  InputFindCustomerDto,
  OutputFindCustomerDTO,
} from './find.customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'

const address = new Address({
  street: 'Street',
  number: 1,
  zip: 'Zip',
  city: 'City',
})

const customer = CustomerFactory.createWithAddress({
  name: 'John',
  address,
})

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
      id: customer.id,
    }

    const output: OutputFindCustomerDTO = {
      id: customer.id,
      name: 'John',
      address: {
        street: 'Street',
        number: 1,
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
