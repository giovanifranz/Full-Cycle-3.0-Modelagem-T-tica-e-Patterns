import { Customer } from '@/domain/customer/entity'
import { Address } from '@/domain/customer/value-object'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { FindCustomerUseCase } from './find.customer.useCase'

describe('Integration test find customer use case', () => {
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

  it('should find customer by id', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'John')
    const address = new Address('Street', 123, 'Zip', 'City')
    customer.changeAddress(address)

    await customerRepository.create(customer)

    const input = {
      id: '123',
    }

    const output = {
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
})
