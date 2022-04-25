import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { Sequelize } from 'sequelize-typescript'

import { Address, Customer } from '../../domain/entity'
import { CustomerModel } from '../db/sequelize/model/customer.model'

import { CustomerRepository } from './customer.repository'

describe('Customer repository test', () => {
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
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 1, 'Zipcode 1', 'City')
    customer.address = address
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 1, 'Zipcode 1', 'City')
    customer.address = address
    await customerRepository.create(customer)
    customer.changeName('Jane Doe')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  })

  it('should findById a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Street', 1, 'Zipcode 1', 'City')
    customer.address = address
    await customerRepository.create(customer)
    const customerResult = await customerRepository.findById('123')

    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()
    await expect(customerRepository.findById('123')).rejects.toThrow('Customer not found')
  })

  it('should find all customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer_1 = new Customer('123', 'John Doe')
    const address_1 = new Address('Street', 1, 'Zipcode 1', 'City')
    customer_1.address = address_1
    customer_1.addRewardPoints(10)

    const customer_2 = new Customer('456', 'Jane Doe')
    const address_2 = new Address('Street', 2, 'Zipcode 2', 'City')
    customer_2.address = address_2
    customer_2.addRewardPoints(20)

    await customerRepository.create(customer_1)
    await customerRepository.create(customer_2)

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer_1)
    expect(customers).toContainEqual(customer_2)
  })
})
