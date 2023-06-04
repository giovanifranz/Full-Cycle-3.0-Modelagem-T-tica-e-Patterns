export type NotificationError = {
  message: string
  context: string
}

export class Notification {
  private errors: NotificationError[] = []

  addError(error: NotificationError) {
    this.errors.push(error)
  }

  messages(context?: string) {
    if (!context) {
      return this.concatMessages(this.errors)
    }

    const filterByContext = this.errors.filter(
      (error) => error.context === context,
    )

    return this.concatMessages(filterByContext)
  }

  private concatMessages(errors: NotificationError[]) {
    return errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
