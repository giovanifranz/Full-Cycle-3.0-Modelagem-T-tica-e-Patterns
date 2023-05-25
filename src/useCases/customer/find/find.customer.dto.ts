export interface InputFindCustomerDto {
  id: string
}

export interface OutputFindCustomerDTO {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    zip: string
  }
}
