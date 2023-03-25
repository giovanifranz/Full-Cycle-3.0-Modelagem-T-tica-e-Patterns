import { EventHandlerInterface, EventInterface } from '@/domain/@shared/event'

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: EventInterface): void {
    console.log('Sending email to ...')
  }
}
