import { EventHandlerInterface, EventInterface } from '@/domain/@shared/event'

export class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`,
    )
  }
}
