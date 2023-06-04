import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((value) => Number(value)),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
