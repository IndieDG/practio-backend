import express from 'express'
import bodyParser from 'body-parser'
import { buildRouter as ping } from './handlers/ping'

export const createApp = () => {
  const app = express()

  app.use('/ping', bodyParser.json(), ping())

  return app
}
