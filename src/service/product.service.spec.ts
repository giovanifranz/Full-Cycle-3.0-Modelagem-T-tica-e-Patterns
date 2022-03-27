import { describe, it, expect } from "@jest/globals";
import { Product } from "../entity";
import { ProductService } from "./";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product_1 = new Product("Id 1", "Product 1", 10);
    const product_2 = new Product("Id 2", "Product 2", 20);
    const products = [product_1, product_2];

    ProductService.increasePrice(products, 100);
    expect(product_1.price).toBe(20);
    expect(product_2.price).toBe(40);
  });
});
