import { CustomerRepository } from '@/infra/customer/repository/sequelize'
import { InputCreateCustomerDto } from '@/useCases/customer/create/create.customer.dto'
import { CreateCustomerUseCase } from '@/useCases/customer/create/create.customer.useCase'
import { ListCustomerUseCase } from '@/useCases/customer/list/list.customer.useCase'
import { Router, Request, Response } from 'express'

export const customerRoute = Router()
const repository = new CustomerRepository()

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(repository)

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    }

    const output = await useCase.execute(customerDto)
    res.status(201).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.get('/', async (_: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(repository)

  try {
    const output = await useCase.execute({})
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
