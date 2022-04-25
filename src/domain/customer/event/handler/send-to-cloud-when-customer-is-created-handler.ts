import { EventHandlerInterface, EventInterface } from '../../../@shared/event'

export class SendToCloudWhenCustomerIsCreatedHandler implements EventHandlerInterface {
  handler(event: EventInterface): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
