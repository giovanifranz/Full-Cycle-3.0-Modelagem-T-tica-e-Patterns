import { Product } from "../entity";
import { RepositoryInterface } from "./repository-interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
