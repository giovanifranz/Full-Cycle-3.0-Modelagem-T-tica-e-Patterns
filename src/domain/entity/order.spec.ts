import { describe, it, expect } from "@jest/globals";
import { Order, OrderItem } from ".";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required");
  });

  it("should throw error when CustomerId is required is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("CustomerId is required");
  });

  it("should throw error when Item is required is empty", () => {
    expect(() => new Order("1", "123", [])).toThrowError("Item are required");
  });

  it("should calculate total", () => {
    const item_1 = new OrderItem("Id 1", "Item 1", 10, "Product 1", 2);
    const item_2 = new OrderItem("Id 2", "Item 2", 20, "Product 2", 2);
    const order_1 = new Order("Order 1", "Customer 1", [item_1]);

    let total = order_1.total();
    expect(total).toBe(20);

    const order_2 = new Order("Order 2", "Customer 2", [item_1, item_2]);
    total = order_2.total();
    expect(total).toBe(60);
  });

  it("should throw if the item qte is less or equal than 0", () => {
    expect(() => {
      const item = new OrderItem("Id 1", "Item 1", 10, "Product 1", 0);
      const order = new Order("Order 1", "Customer 1", [item]);
      order.total();
    }).toThrowError("Quantity must be greater than 0");
  });
});
