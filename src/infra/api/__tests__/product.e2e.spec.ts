import {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  it,
  expect,
} from '@jest/globals'
import request from 'supertest'
import { sequelize, app } from '../fastify'
import { InputCreateProductDto } from '@/useCases/product/create/create.product.dto'
import { InputUpdateProductDto } from '@/useCases/product/update/update.product.dto'

describe('E2E test for product', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const input: InputCreateProductDto = {
      name: 'Product',
      price: 100,
      type: 'a',
    }

    const response = await request(app.server).post('/product').send(input)

    expect(response.status).toBe(201)
    expect(response.body.name).toBe(input.name)
    expect(response.body.price).toBe(input.price)
  })

  it('should not create a product with invalid input', async () => {
    const input = { name: 'Product' }

    const response = await request(app.server).post('/product').send(input)

    expect(response.status).toBe(500)
  })

  it('should list all products', async () => {
    const input1: InputCreateProductDto = {
      name: 'Product A',
      price: 100,
      type: 'a',
    }

    const input2: InputCreateProductDto = {
      name: 'Product B',
      price: 200,
      type: 'b',
    }
    const response1 = await request(app.server).post('/product').send(input1)
    expect(response1.status).toBe(201)

    const response2 = await request(app.server).post('/product').send(input2)
    expect(response2.status).toBe(201)

    const listResponse = await request(app.server).get('/product').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const productA = listResponse.body.products[0]
    expect(productA.name).toBe(input1.name)
    expect(productA.price).toBe(input1.price)

    const productB = listResponse.body.products[1]
    expect(productB.name).toBe(input2.name)
    expect(productB.price).toBe(input2.price * 2)
  })

  it('should find a product', async () => {
    const input: InputCreateProductDto = {
      name: 'Product',
      price: 100,
      type: 'a',
    }

    const response = await request(app.server).post('/product').send(input)
    expect(response.status).toBe(201)

    const findResponse = await request(app.server)
      .get(`/product/${response.body.id}`)
      .send()

    expect(findResponse.status).toBe(200)
    expect(findResponse.body.name).toBe(input.name)
    expect(findResponse.body.price).toBe(input.price)
  })

  it('should not find a product with invalid input', async () => {
    const response = await request(app.server)
      .get(`/product/invalid-uuid`)
      .send()

    expect(response.status).toBe(404)
  })

  it('should update a product', async () => {
    const input: InputCreateProductDto = {
      name: 'Product',
      price: 100,
      type: 'a',
    }

    const response = await request(app.server).post('/product').send(input)
    expect(response.status).toBe(201)

    const update: InputUpdateProductDto = {
      id: response.body.id,
      name: 'Product 2',
      price: 400,
    }

    const updatedResponse = await request(app.server)
      .put(`/product`)
      .send(update)

    expect(updatedResponse.status).toBe(200)
    expect(updatedResponse.body.name).toBe(update.name)
    expect(updatedResponse.body.price).toBe(update.price)
  })

  it('should not update a product with invalid input', async () => {
    const update: InputUpdateProductDto = {
      id: 'invalid-id',
      name: 'Product 2',
      price: 400,
    }

    const response = await request(app.server).put(`/product`).send(update)

    expect(response.status).toBe(404)
  })
})
