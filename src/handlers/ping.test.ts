import request from 'supertest'
import { createApp } from '../app'

const appConfig = {
  rateLimit: { windowMs: 60000, max: 10 },
}

describe('/ping', () => {
  it('should return pong when GET to /ping is called', async () => {
    await request(createApp(appConfig)).get('/ping').expect(200, 'pong')
  })

  it('should return pong when POST to /ping is called', async () => {
    await request(createApp(appConfig)).post('/ping').expect(200, 'pong')
  })

  it('should return pong when DELETE to /ping is called', async () => {
    await request(createApp(appConfig)).delete('/ping').expect(200, 'pong')
  })

  it('should return pong when PATCH to /ping is called', async () => {
    await request(createApp(appConfig)).patch('/ping').expect(200, 'pong')
  })

  it('should return pong when PUT to /ping is called', async () => {
    await request(createApp(appConfig)).put('/ping').expect(200, 'pong')
  })
})
