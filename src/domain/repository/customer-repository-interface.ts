import { Customer } from "../entity";
import { RepositoryInterface } from "./repository-interface";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
