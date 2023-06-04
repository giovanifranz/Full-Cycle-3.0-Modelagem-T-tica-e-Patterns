import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import { CustomerModel } from '@/infra/customer/repository/sequelize'

import { OrderItemModel } from './orderItemModel'

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column(DataType.STRING)
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

  @Column(DataType.NUMBER)
  declare total: number
}
