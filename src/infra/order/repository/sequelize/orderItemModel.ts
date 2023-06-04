import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import { ProductModel } from '@/infra/product/repository/sequelize'

import { OrderModel } from './orderModel'

@Table({
  tableName: 'order_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column(DataType.STRING)
  declare product_id: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @ForeignKey(() => OrderModel)
  @Column(DataType.STRING)
  declare order_id: string

  @BelongsTo(() => OrderModel)
  declare order: OrderModel

  @Column(DataType.NUMBER)
  declare quantity: number

  @Column(DataType.STRING)
  declare name: string

  @Column(DataType.NUMBER)
  declare price: number
}
