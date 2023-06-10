import { Notification } from '../notification'

export abstract class Entity {
  protected _id: string
  public _notification: Notification

  constructor(id: string) {
    this._id = id
    this._notification = new Notification()
  }

  get id(): string {
    return this._id
  }
}
