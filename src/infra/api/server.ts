import { app } from './fastify'
import { env } from './env'

const { PORT } = env

app.listen({ port: PORT }, () => {
  console.log(`Server is listening on port ${PORT}`)
})
