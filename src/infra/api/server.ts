import { app } from './express'
import { config } from 'dotenv'
config()

const PORT: number = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
