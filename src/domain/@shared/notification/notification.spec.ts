import { describe, expect, it } from '@jest/globals'
import { Notification, NotificationErrorProps } from './notification'

describe('Unit tests for notification', () => {
  it('should create errors', () => {
    const notification = new Notification()
    const error1: NotificationErrorProps = {
      message: 'error 1 message',
      context: 'customer',
    }

    notification.addError(error1)

    expect(notification.messages('customer')).toBe('customer: error 1 message')

    const error2: NotificationErrorProps = {
      message: 'error 2 message',
      context: 'customer',
    }
    notification.addError(error2)

    expect(notification.messages('customer')).toBe(
      'customer: error 1 message, customer: error 2 message',
    )

    const error3: NotificationErrorProps = {
      message: 'error 3 message',
      context: 'order',
    }
    notification.addError(error3)

    expect(notification.messages('customer')).toBe(
      'customer: error 1 message, customer: error 2 message',
    )
    expect(notification.messages('order')).toBe('order: error 3 message')
    expect(notification.messages()).toBe(
      'customer: error 1 message, customer: error 2 message, order: error 3 message',
    )
  })

  it('should check if notification has at least one error', () => {
    const notification = new Notification()
    expect(notification.hasErrors()).toBe(false)

    notification.addError({
      message: 'error message',
      context: 'customer',
    })

    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors props', () => {
    const notification = new Notification()

    const error: NotificationErrorProps = {
      message: 'error message',
      context: 'customer',
    }

    notification.addError(error)

    expect(notification.getErrors()).toEqual([error])
  })
})
