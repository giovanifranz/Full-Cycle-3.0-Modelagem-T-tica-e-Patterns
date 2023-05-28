import { Order, OrderItem } from './domain/checkout/entity'
import { Customer } from './domain/customer/entity'
import { Address } from './domain/customer/value-object'

const customer = new Customer('123', 'Giovani Franz')
const address = new Address({
  street: 'Rua dois',
  number: 123,
  zip: '12345-678',
  city: 'São Paulo',
})
customer.changeAddress(address)
customer.activate()
console.log('customer', customer)

const item1 = new OrderItem('1', 'Item 1', 10, 'Product 1', 2)
const item2 = new OrderItem('2', 'Item 2', 20, 'Product 2', 2)
const order = new Order('1', '123', [item1, item2])
console.log('order', order)
