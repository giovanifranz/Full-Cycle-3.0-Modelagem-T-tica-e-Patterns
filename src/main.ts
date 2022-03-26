import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Giovani Franz");
const addres = new Address("Rua dois", 123, "12345-678", "São Paulo");
customer.address = addres;
customer.activate();
console.log('customer', customer);

const item_1 = new OrderItem("1", "Item 1", 10);
const item_2 = new OrderItem("2", "Item 2", 20);
const order = new Order("1", "123", [item_1, item_2]);
console.log('order', order);