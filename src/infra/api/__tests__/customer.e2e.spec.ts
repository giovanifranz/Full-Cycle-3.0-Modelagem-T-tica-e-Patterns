import { describe, beforeEach, afterAll, it, expect } from '@jest/globals'
import request from 'supertest'
import { app, sequelize } from '../express'
import { InputCreateCustomerDto } from '@/useCases/customer/create/create.customer.dto'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const input: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const response = await request(app).post('/customer').send(input)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(input.name)
    expect(response.body.address.street).toBe(input.address.street)
    expect(response.body.address.number).toBe(input.address.number)
    expect(response.body.address.zip).toBe(input.address.zip)
    expect(response.body.address.city).toBe(input.address.city)
  })

  it('should not create a customer with invalid input', async () => {
    const input = { name: 'John' }

    const response = await request(app).post('/customer').send(input)

    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const input1: InputCreateCustomerDto = {
      name: 'John',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    }

    const input2: InputCreateCustomerDto = {
      name: 'James',
      address: {
        street: 'Street 2',
        number: 321,
        zip: 'Zip 2',
        city: 'City 2',
      },
    }
    const response1 = await request(app).post('/customer').send(input1)
    expect(response1.status).toBe(201)

    const response2 = await request(app).post('/customer').send(input2)
    expect(response2.status).toBe(201)

    const listResponse = await request(app).get('/customer').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)

    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe(input1.name)
    expect(customer1.address.street).toBe(input1.address.street)
    expect(customer1.address.city).toBe(input1.address.city)
    expect(customer1.address.zip).toBe(input1.address.zip)
    expect(customer1.address.number).toBe(input1.address.number)

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe(input2.name)
    expect(customer2.address.street).toBe(input2.address.street)
    expect(customer2.address.city).toBe(input2.address.city)
    expect(customer2.address.zip).toBe(input2.address.zip)
    expect(customer2.address.number).toBe(input2.address.number)
  })
})
