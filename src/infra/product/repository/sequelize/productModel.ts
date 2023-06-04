import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string

  @Column(DataType.STRING)
  declare name: string

  @Column(DataType.NUMBER)
  declare price: number
}
