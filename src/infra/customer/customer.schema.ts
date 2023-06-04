import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    zip: z.string(),
    city: z.string(),
  }),
})

export const findCustomerSchema = z.object({
  id: z.string().uuid(),
})

export const updateCustomerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  address: z.object({
    street: z.string(),
    number: z.number(),
    zip: z.string(),
    city: z.string(),
  }),
})
