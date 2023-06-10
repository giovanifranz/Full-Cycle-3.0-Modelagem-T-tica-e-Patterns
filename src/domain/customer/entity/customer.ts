import { Entity } from '@/domain/@shared/entity/entity.abstract'
import { Address } from '../value-object'
import { NotificationError } from '@/domain/@shared/notification/notification.error'
import { CustomerValidatorFactory } from '../factory/customer.validator.factory'

export class Customer extends Entity {
  private _name = ''
  private _address!: Address
  private _active = false
  private _rewardPoints = 0

  constructor(id: string, name: string) {
    super(id)
    this._name = name
    this.validate()

    if (this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors())
    }
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get name(): string {
    return this._name
  }

  get address(): Address {
    return this._address
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
}
