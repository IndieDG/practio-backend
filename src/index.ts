import { createApp, AppConfig } from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080
const LIMITER_WINDOW_MS = parseInt(process.env.LIMITER_WINDOW_MS) || 60000
const LIMITER_MAX_REQUESTS = parseInt(process.env.LIMITER_MAX_REQUESTS) || 10

const appConfig: AppConfig = {
  rateLimit: { windowMs: LIMITER_WINDOW_MS, max: LIMITER_MAX_REQUESTS },
}

createApp(appConfig).listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`)
})
