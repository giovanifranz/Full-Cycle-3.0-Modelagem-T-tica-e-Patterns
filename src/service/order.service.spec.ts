import { describe, it, expect } from "@jest/globals";
import { Order, OrderItem } from "../entity";
import { OrderService } from "./";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem_1 = new OrderItem("1", "item 1", 100, "Product_1", 1);
    const orderItem_2 = new OrderItem("2", "item 2", 200, "Product_2", 2);

    const order_1 = new Order("1", "Customer_1", [orderItem_1]);
    const order_2 = new Order("2", "Customer_2", [orderItem_2]);

    const total = OrderService.total([order_1, order_2]);
    expect(total).toBe(500);
  });
});
