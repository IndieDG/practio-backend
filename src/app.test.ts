import request from 'supertest'
import googleTrends from 'google-trends-api'
import { createApp } from './app'
import { mocked } from 'ts-jest/utils'

jest.mock('google-trends-api')

const interests = { some: 'interests' }

describe('app', () => {
  mocked(googleTrends).interestOverTime.mockImplementation(
    (): Promise<any> => {
      return Promise.resolve(interests)
    }
  )

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('accepts calls from user when limmit has not been reached', async () => {
    const appConfig = {
      rateLimit: { windowMs: 60000, max: 1 },
    }
    const app = createApp(appConfig)

    const response = await request(app).get('/popularity?keyword=SomeKeyWord')

    expect(response.text).toStrictEqual(JSON.stringify(interests))
  })

  it('does NOT accept calls from user when limmit has been reached', async () => {
    const appConfig = {
      rateLimit: { windowMs: 60000, max: 1 },
    }
    const app = createApp(appConfig)

    await request(app).get('/popularity?keyword=SomeKeyWord')
    const response = await request(app).get('/popularity?keyword=SomeKeyWord')

    expect(response.text).toStrictEqual(
      'Too many requests, please try again later.'
    )
  })
})
