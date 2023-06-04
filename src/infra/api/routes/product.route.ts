import { ProductRepositoryInterface } from '@/domain/product/repository/productRepositoryInterface'
import {
  createProductSchema,
  findProductSchema,
  updateProductSchema,
} from '@/infra/product/product.schema'
import { InputCreateProductDto } from '@/useCases/product/create/create.product.dto'
import { CreateProductUseCase } from '@/useCases/product/create/create.product.useCase'
import { InputFindProductDto } from '@/useCases/product/find/find.product.dto'
import { FindProductUseCase } from '@/useCases/product/find/find.product.useCase'
import { ListProductUseCase } from '@/useCases/product/list/list.product.useCase'
import { InputUpdateProductDto } from '@/useCases/product/update/update.product.dto'
import { UpdateProductUseCase } from '@/useCases/product/update/update.product.useCase'
import { FastifyInstance } from 'fastify'

export async function productRoutes(
  app: FastifyInstance,
  repository: ProductRepositoryInterface,
) {
  app.post('/', async (request, reply) => {
    const useCase = new CreateProductUseCase(repository)

    try {
      const input = createProductSchema.parse(request.body)
      const productDto: InputCreateProductDto = {
        name: input.name,
        price: input.price,
        type: input.type,
      }

      const output = await useCase.execute(productDto)
      reply.status(201).send(output)
    } catch (err) {
      reply.status(500).send(err)
    }
  })

  app.get('/', async (_, reply) => {
    const useCase = new ListProductUseCase(repository)

    try {
      const output = await useCase.execute({})
      reply.status(200).send(output)
    } catch (err) {
      reply.status(500).send(err)
    }
  })

  app.get('/:id', async (request, reply) => {
    const useCase = new FindProductUseCase(repository)

    try {
      const input = findProductSchema.parse(request.params)
      const productDto: InputFindProductDto = {
        id: input.id,
      }

      const output = await useCase.execute(productDto)
      reply.status(200).send(output)
    } catch (err) {
      reply.status(404).send(err)
    }
  })

  app.put('/', async (request, reply) => {
    const useCase = new UpdateProductUseCase(repository)

    try {
      const input = updateProductSchema.parse(request.body)
      const productDto: InputUpdateProductDto = {
        id: input.id,
        name: input.name,
        price: input.price,
      }

      const output = await useCase.execute(productDto)
      reply.status(200).send(output)
    } catch (err) {
      reply.status(404).send(err)
    }
  })
}
