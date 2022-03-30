export class Address {
  _street: string = "";
  _number: number = 0;
  _zipcode: string = "";
  _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zip;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  validate(): void {
    if (!this._street.length) {
      throw new Error("Street is required");
    }
    if (!this._number) {
      throw new Error("Number is required");
    }
    if (!this._zipcode.length) {
      throw new Error("Zip is required");
    }
    if (!this._city.length) {
      throw new Error("City is required");
    }
  }

  toString(): string {
    return `${this._street} ${this._number} ${this._zipcode} ${this._city}`;
  }
}
