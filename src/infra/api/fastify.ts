import fastify, { FastifyInstance } from 'fastify'
import { Sequelize } from 'sequelize-typescript'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { customerRoutes } from './routes/customer.route'
import {
  ProductModel,
  ProductRepository,
} from '../product/repository/sequelize'
import { productRoutes } from './routes/product.route'

export const app: FastifyInstance = fastify()

/**
 * Injeção de dependência do repository
 * para realizar testes em memória InMemoryCustomerRepository
 */

app.register((instance) => customerRoutes(instance, new CustomerRepository()), {
  prefix: 'customer',
})
app.register((instance) => productRoutes(instance, new ProductRepository()), {
  prefix: 'product',
})

export let sequelize: Sequelize
;(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
})()
