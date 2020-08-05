import request from 'supertest'
import { createApp } from '../app'

describe('/ping', () => {
  it('should return pong when GET to /ping is called', async () => {
    await request(createApp()).get('/ping').expect(200, 'pong')
  })

  it('should return pong when POST to /ping is called', async () => {
    await request(createApp()).post('/ping').expect(200, 'pong')
  })

  it('should return pong when DELETE to /ping is called', async () => {
    await request(createApp()).delete('/ping').expect(200, 'pong')
  })

  it('should return pong when PATCH to /ping is called', async () => {
    await request(createApp()).patch('/ping').expect(200, 'pong')
  })

  it('should return pong when PUT to /ping is called', async () => {
    await request(createApp()).put('/ping').expect(200, 'pong')
  })
})
