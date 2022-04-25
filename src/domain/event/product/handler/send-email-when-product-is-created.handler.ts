import { EventHandlerInterface } from '../../@shared'
import { ProductCreatedEvent } from '../product-created.event'

export class SendEmailWhenProductIsCreatedHanlder implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ...`)
  }
}
