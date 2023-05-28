import { CustomerFactory } from '@/domain/customer/factory/customer-factory'
import { Address } from '@/domain/customer/value-object'
import { CustomerRepository } from '@/infra/customer/repository/sequelize'
import { describe, it, expect, jest } from '@jest/globals'
import { ListCustomerUseCase } from './list.customer.useCase'

const customer1 = CustomerFactory.createWithAddress({
  name: 'John',
  address: new Address({
    street: 'Street',
    number: 1,
    zip: 'Zip',
    city: 'City',
  }),
})

const customer2 = CustomerFactory.createWithAddress({
  name: 'Janie',
  address: new Address({
    street: 'Street 2',
    number: 2,
    zip: 'Zip 2',
    city: 'City 2',
  }),
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test list customer use case', () => {
  it('should list a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new ListCustomerUseCase(
      customerRepository as CustomerRepository,
    )

    const output = await useCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[0].address.number).toBe(customer1.address.number)
    expect(output.customers[0].address.zip).toBe(customer1.address.zip)
    expect(output.customers[0].address.city).toBe(customer1.address.city)

    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
    expect(output.customers[1].address.number).toBe(customer2.address.number)
    expect(output.customers[1].address.zip).toBe(customer2.address.zip)
    expect(output.customers[1].address.city).toBe(customer2.address.city)
  })
})
