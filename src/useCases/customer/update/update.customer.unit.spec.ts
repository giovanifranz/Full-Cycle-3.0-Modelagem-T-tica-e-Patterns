import { describe, it, expect, jest } from '@jest/globals'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'
import { Address } from '@/domain/customer/value-object'
import { InputUpdateCustomerDto } from './update.customer.dto'
import { CustomerRepository } from '@/infra/customer/repository/sequelize'
import { UpdateCustomerUseCase } from './update.customer.useCase'

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('Street', 123, 'Zip', 'City'),
)

const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 123,
    zip: 'Zip Updated',
    city: 'City Updated',
  },
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe('Unit test update customer use case', () => {
  it('should update customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUseCase(
      customerRepository as CustomerRepository,
    )

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
