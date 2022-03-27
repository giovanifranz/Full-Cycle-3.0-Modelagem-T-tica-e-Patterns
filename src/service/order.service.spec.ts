import { describe, it, expect } from "@jest/globals";
import { Customer, Order, OrderItem } from "../entity";
import { OrderService } from "./";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "Giovani Franz");
    const item_1 = new OrderItem("1", "item 1", 100, "Product_1", 1);

    const order = OrderService.placeOrder(customer, [item_1]);
    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it("should get total of all orders", () => {
    const item_1 = new OrderItem("1", "item 1", 100, "Product_1", 1);
    const item_2 = new OrderItem("2", "item 2", 200, "Product_2", 2);

    const order_1 = new Order("1", "Customer_1", [item_1]);
    const order_2 = new Order("2", "Customer_2", [item_2]);

    const total = OrderService.total([order_1, order_2]);
    expect(total).toBe(500);
  });
});
