import { EventHandlerInterface, EventInterface } from '@/domain/@shared/event'

export class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
