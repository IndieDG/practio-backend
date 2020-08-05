import express from 'express'
import bodyParser from 'body-parser'
import { buildRouter as ping } from './handlers/ping'
import { buildRouter as popularity } from './handlers/popularity'

export const createApp = () => {
  const app = express()

  app.use('/ping', bodyParser.json(), ping())
  app.use('/popularity', bodyParser.json(), popularity())

  return app
}
