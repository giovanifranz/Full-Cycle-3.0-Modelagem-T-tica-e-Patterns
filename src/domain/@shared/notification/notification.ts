export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private _errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this._errors.push(error)
  }

  messages(context?: string) {
    function concatMessages(errors: NotificationErrorProps[]) {
      return errors
        .map((error) => `${error.context}: ${error.message}`)
        .join(', ')
    }

    if (!context) {
      return concatMessages(this._errors)
    }

    const filterByContext = this._errors.filter(
      (error) => error.context === context,
    )

    return concatMessages(filterByContext)
  }

  hasErrors(): boolean {
    return this._errors.length > 0
  }

  getErrors(): NotificationErrorProps[] {
    return this._errors
  }
}
