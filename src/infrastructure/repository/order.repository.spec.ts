import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import {
  Address,
  Customer,
  Order,
  OrderItem,
  Product,
} from "../../domain/entity";
import {
  CustomerModel,
  OrderModel,
  OrderItemModel,
  ProductModel,
} from "../db/sequelize/model";
import { CustomerRepository, OrderRepository, ProductRepository } from "./";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street", 1, "Zipcode 1", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street", 1, "Zipcode 1", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product_1 = new Product("1", "Product 1", 10);
    await productRepository.create(product_1);

    const orderItem = new OrderItem(
      "1",
      product_1.name,
      product_1.price,
      product_1.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });

    order.changeItems([
      new OrderItem(
        orderItem.id,
        product_1.name,
        product_1.price,
        product_1.id,
        3
      ),
    ]);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id,
        },
      ],
    });
  });

  it("should findById a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street", 1, "Zipcode 1", "City");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 20);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const resultOrder = await orderRepository.findById(order.id);

    expect(orderModel.toJSON()).toStrictEqual({
      id: resultOrder.id,
      customer_id: resultOrder.customerId,
      total: resultOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: resultOrder.id,
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer_1 = new Customer("123", "Customer 1");
    const address_1 = new Address("Street", 1, "Zipcode 1", "City");
    customer_1.changeAddress(address_1);
    await customerRepository.create(customer_1);

    const productRepository = new ProductRepository();
    const product_1 = new Product("1", "Product 1", 10);
    await productRepository.create(product_1);

    const orderItem1 = new OrderItem(
      "1",
      product_1.name,
      product_1.price,
      product_1.id,
      4
    );

    const order1 = new Order("1", customer_1.id, [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);

    const customer_2 = new Customer("321", "Customer 2");
    const address_2 = new Address("Street 2", 2, "Zipcode 2", "City");
    customer_2.changeAddress(address_2);
    await customerRepository.create(customer_2);

    const product_2 = new Product("2", "Product 2", 20);
    await productRepository.create(product_2);

    const orderItem2 = new OrderItem(
      "2",
      product_2.name,
      product_2.price,
      product_2.id,
      2
    );

    const order2 = new Order("2", customer_2.id, [orderItem2]);
    await orderRepository.create(order2);

    const resultOrders = await orderRepository.findAll();

    expect(resultOrders).toHaveLength(2);
    expect(resultOrders).toContainEqual(order1);
    expect(resultOrders).toContainEqual(order2);
  });
});
