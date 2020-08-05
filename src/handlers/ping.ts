import { Router } from 'express'

export const buildRouter = () => {
  const router = Router()
  router.all('/', (_, res, __) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.send('pong')
  })

  return router
}
