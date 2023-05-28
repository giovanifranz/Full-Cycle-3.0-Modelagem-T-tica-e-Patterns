import { Customer } from '@/domain/customer/entity'
import { Address } from '@/domain/customer/value-object'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { CreateCustomerUseCase } from './create.customer.useCase'
import { InputCreateCustomerDto } from './create.customer.dto'

describe('Integration test create customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'John')
    const address = new Address({
      street: 'Street',
      number: 1,
      zip: 'Zip',
      city: 'City',
    })

    customer.changeAddress(address)

    await customerRepository.create(customer)

    const input: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
