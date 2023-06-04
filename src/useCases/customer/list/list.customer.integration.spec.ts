import { Address } from '@/domain/customer/value-object'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from './list.customer.dto'
import { CustomerFactory } from '@/domain/customer/factory/customer-factory'
import { ListCustomerUseCase } from './list.customer.useCase'

describe('Integration test list customer use case', () => {
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

  it('should list customers', async () => {
    const customerRepository = new CustomerRepository()
    const useCase = new ListCustomerUseCase(customerRepository)

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

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const input: InputListCustomerDto = {}

    const output: OutputListCustomerDto = {
      customers: [
        {
          id: customer1.id,
          name: 'John',
          address: {
            street: 'Street',
            number: 1,
            zip: 'Zip',
            city: 'City',
          },
        },
        {
          id: customer2.id,
          name: 'Janie',
          address: {
            street: 'Street 2',
            number: 2,
            zip: 'Zip 2',
            city: 'City 2',
          },
        },
      ],
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
})
