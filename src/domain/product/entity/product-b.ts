import { Entity } from '@/domain/@shared/entity/entity.abstract'
import { ProductInterface } from './product-interface'
import { NotificationError } from '@/domain/@shared/notification/notification.error'
import { ProductValidatorFactory } from '../factory/product.validator.factory'

export class ProductB extends Entity implements ProductInterface {
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super(id)
    this._name = name
    this._price = price
    this.validate()

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price * 2
  }

  validate() {
    ProductValidatorFactory.create().validate(this)
  }

  changeName(name: string): void {
    this._name = name
    this.validate()
  }

  changePrice(price: number): void {
    this._price = price
    this.validate()
  }
}
