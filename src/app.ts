import express from 'express'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'
import { buildRouter as ping } from './handlers/ping'
import { buildRouter as popularity } from './handlers/popularity'

export type AppConfig = {
  rateLimit: rateLimit.Options
}

const keyGenerator = (req: any) => {
  return req.params.userId
}

export const createApp = (config: AppConfig) => {
  const app = express()

  const limiter = rateLimit({ ...config.rateLimit, keyGenerator })

  app.use('/ping', bodyParser.json(), ping())
  app.use('/:userId/popularity', limiter, popularity())

  return app
}
