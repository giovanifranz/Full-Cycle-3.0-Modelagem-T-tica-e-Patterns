import { OutputListCustomerDto } from '@/useCases/customer/list/list.customer.dto'
import { toXML, XmlOptions } from 'jstoxml'

export class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions: XmlOptions = {
      header: true,
      indent: '  ',
    }

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              zip: customer.address.zip,
            },
          })),
        },
      },
      xmlOptions,
    )
  }
}
