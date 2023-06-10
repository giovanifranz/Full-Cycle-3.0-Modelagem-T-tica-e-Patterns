import { CustomerRepositoryInterface } from '@/domain/customer/repository/customerRepositoryInterface'
import {
  createCustomerSchema,
  findCustomerSchema,
  updateCustomerSchema,
} from '@/infra/customer/customer.schema'
import { InputCreateCustomerDto } from '@/useCases/customer/create/create.customer.dto'
import { CreateCustomerUseCase } from '@/useCases/customer/create/create.customer.useCase'
import { InputFindCustomerDto } from '@/useCases/customer/find/find.customer.dto'
import { FindCustomerUseCase } from '@/useCases/customer/find/find.customer.useCase'
import { ListCustomerUseCase } from '@/useCases/customer/list/list.customer.useCase'
import { InputUpdateCustomerDto } from '@/useCases/customer/update/update.customer.dto'
import { UpdateCustomerUseCase } from '@/useCases/customer/update/update.customer.useCase'
import { FastifyInstance } from 'fastify'
import { CustomerPresenter } from '../presenters/customer.presenter'

export async function customerRoutes(
  app: FastifyInstance,
  repository: CustomerRepositoryInterface,
) {
  app.post('/', async (request, reply) => {
    const useCase = new CreateCustomerUseCase(repository)

    try {
      const input = createCustomerSchema.parse(request.body)
      const customerDto: InputCreateCustomerDto = {
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          zip: input.address.zip,
          city: input.address.city,
        },
      }

      const output = await useCase.execute(customerDto)
      reply.status(201).send(output)
    } catch (err) {
      reply.status(500).send(err)
    }
  })

  app.get('/', async (request, reply) => {
    const useCase = new ListCustomerUseCase(repository)
    const acceptHeader = request.headers.accept

    try {
      const output = await useCase.execute({})

      if (acceptHeader && acceptHeader.includes('application/xml')) {
        return reply
          .header('Content-Type', 'application/xml')
          .status(200)
          .send(CustomerPresenter.toXML(output))
      }

      return reply
        .header('Content-Type', 'application/json')
        .status(200)
        .send(output)
    } catch (err) {
      reply.status(500).send(err)
    }
  })

  app.get('/:id', async (request, reply) => {
    const useCase = new FindCustomerUseCase(repository)

    try {
      const input = findCustomerSchema.parse(request.params)
      const customerDto: InputFindCustomerDto = {
        id: input.id,
      }

      const output = await useCase.execute(customerDto)
      reply.status(200).send(output)
    } catch (err) {
      reply.status(404).send(err)
    }
  })

  app.put('/', async (request, reply) => {
    const useCase = new UpdateCustomerUseCase(repository)

    try {
      const input = updateCustomerSchema.parse(request.body)
      const customerDto: InputUpdateCustomerDto = {
        id: input.id,
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          zip: input.address.zip,
          city: input.address.city,
        },
      }

      const output = await useCase.execute(customerDto)
      reply.status(200).send(output)
    } catch (err) {
      reply.status(404).send(err)
    }
  })
}
