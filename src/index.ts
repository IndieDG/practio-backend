import { createApp } from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

createApp().listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`)
})
