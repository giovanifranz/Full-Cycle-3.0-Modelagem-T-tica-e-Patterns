import { describe, it, expect } from "@jest/globals";
import { Customer, Address } from "./";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "Giovani")).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Giovani");
    const newName = "Wesley Willians";
    customer.changeName(newName);
    expect(customer.name).toBe(newName);
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Rua dois", 123, "12345-678", "São Paulo");
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deActivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deActivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefinde when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });
});
