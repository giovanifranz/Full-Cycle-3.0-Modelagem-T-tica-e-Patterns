import { Order, OrderItem } from "../../domain/entity";
import { OrderRepositoryInterface } from "../../domain/repository";
import { OrderModel, OrderItemModel } from "../db/sequelize/model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(({ id, name, price, productId, quantity }) => ({
          id,
          name,
          price,
          product_id: productId,
          quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map(({ id, name, price, productId, quantity }) => ({
          id,
          name,
          price,
          product_id: productId,
          quantity,
        })),
      },
      { where: { id: entity.id } }
    );
  }

  async findById(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        ({ id, name, price, product_id, quantity }) =>
          new OrderItem(id, name, price, product_id, quantity)
      )
    );
  }

  async findAll(): Promise<Order[]> {
    let orderModels;
    try {
      orderModels = await OrderModel.findAll({
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return orderModels.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            ({ id, name, price, product_id, quantity }) =>
              new OrderItem(id, name, price, product_id, quantity)
          )
        )
    );
  }
}
