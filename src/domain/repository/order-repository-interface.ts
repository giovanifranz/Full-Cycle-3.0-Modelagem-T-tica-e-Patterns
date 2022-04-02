import { Order } from "../entity";
import { RepositoryInterface } from "./repository-interface";

export interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
