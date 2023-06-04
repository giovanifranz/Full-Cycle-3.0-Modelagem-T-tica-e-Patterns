import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  type: z.string(),
})

export const findProductSchema = z.object({
  id: z.string().uuid(),
})

export const updateProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
})
