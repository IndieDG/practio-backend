import { Router } from 'express'
import googleTrends from 'google-trends-api'
import { interestOverTimeError } from '../errors/google'
import { noKeywordError } from '../errors/internal'

export const buildRouter = () => {
  const router = Router()
  router.get('/', async (req, res, __) => {
    const keyword = req.query.keyword

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    if (!keyword) {
      res.statusCode = 400
      res.json(noKeywordError('keyword'))
    } else {
      await googleTrends
        .interestOverTime({ keyword })
        .then((results: any) => {
          res.statusCode = 200
          res.json(results)
        })
        .catch((e: any) => {
          console.log('Error:', e)
          res.statusCode = 502
          res.json(interestOverTimeError)
        })
    }
  })

  return router
}
