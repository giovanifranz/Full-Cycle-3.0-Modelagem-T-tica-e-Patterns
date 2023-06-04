import { Address } from '@/domain/customer/value-object'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import { UpdateCustomerUseCase } from './update.customer.useCase'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDTO,
} from './update.customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'

describe('Integration test update customer use case', () => {
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

  it('should update product', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new UpdateCustomerUseCase(customerRepository)

    const customer = CustomerFactory.createWithAddress({
      name: 'John',
      address: new Address({
        street: 'Street',
        number: 1,
        zip: 'Zip',
        city: 'City',
      }),
    })

    await customerRepository.create(customer)

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

    const output: OutputUpdateCustomerDTO = {
      id: customer.id,
      name: 'John Updated',
      address: {
        street: 'Street Updated',
        number: 123,
        zip: 'Zip Updated',
        city: 'City Updated',
      },
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
