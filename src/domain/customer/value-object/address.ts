interface Props {
  street: string
  number: number
  zip: string
  city: string
}

export class Address {
  _street = ''
  _number = 0
  _zip = ''
  _city = ''

  constructor({ street, number, zip, city }: Props) {
    this._street = street
    this._number = number
    this._zip = zip
    this._city = city

    this.validate()
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get zip(): string {
    return this._zip
  }

  get city(): string {
    return this._city
  }

  validate() {
    if (!this._street.length) {
      throw new Error('Street is required')
    }
    if (this._number <= 0) {
      throw new Error('Number must be greater than zero')
    }
    if (!this._zip.length) {
      throw new Error('Zip is required')
    }
    if (!this._city.length) {
      throw new Error('City is required')
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`
  }
}
