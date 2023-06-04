import { app } from './fastify'
import { config } from 'dotenv'
config()

const PORT: number = Number(process.env.PORT) || 3000

app.listen({ port: PORT }, () => {
  console.log(`Server is listening on port ${PORT}`)
})
