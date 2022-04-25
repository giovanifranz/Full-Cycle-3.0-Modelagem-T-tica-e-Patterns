import { randomUUID } from 'node:crypto'

import { Customer } from '../entity'
import { Address } from '../value-object'

export class CustomerFactory {
  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(randomUUID(), name)
    customer.changeAddress(address)
    return customer
  }

  public static create(name: string): Customer {
    return new Customer(randomUUID(), name)
  }
}
