import fastify, { FastifyInstance } from 'fastify'
import { Sequelize } from 'sequelize-typescript'
import {
  CustomerModel,
  CustomerRepository,
} from '@/infra/customer/repository/sequelize'
import { customerRoutes } from './routes/customer.route'

export const app: FastifyInstance = fastify()

/**
 * Injeção de dependência do repository
 * para realizar testes em memória InMemoryCustomerRepository
 */

app.register((instance) => customerRoutes(instance, new CustomerRepository()), {
  prefix: 'customer',
})

export let sequelize: Sequelize
;(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([CustomerModel])
  await sequelize.sync()
})()
