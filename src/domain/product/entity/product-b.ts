import { Entity } from '@/domain/@shared/entity/entity.abstract'
import { ProductInterface } from './product-interface'
import { NotificationError } from '@/domain/@shared/notification/notification.error'

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
    if (!this._id.length) {
      this._notification.addError({
        context: 'product B',
        message: 'Id is required',
      })
    }
    if (!this._name.length) {
      this._notification.addError({
        context: 'product B',
        message: 'Name is required',
      })
    }
    if (this._price < 0) {
      this._notification.addError({
        context: 'product B',
        message: 'Price must be greater than zero',
      })
    }
    return true
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
