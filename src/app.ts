import express from 'express'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import { buildRouter as ping } from './handlers/ping'
import { buildRouter as popularity } from './handlers/popularity'

export type AppConfig = {
  rateLimit: rateLimit.Options
}

export const createApp = (config: AppConfig) => {
  const app = express()

  const limiter = rateLimit(config.rateLimit)

  app.use('/ping', bodyParser.json(), ping())
  app.use('/popularity', limiter, popularity())

  return app
}
