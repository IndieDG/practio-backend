import request from 'supertest'
import googleTrends from 'google-trends-api'
import { createApp } from '../app'
import { mocked } from 'ts-jest/utils'

jest.mock('google-trends-api')

const appConfig = {
  rateLimit: { windowMs: 60000, max: 10 },
}

describe('/popularity', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should return google-trends-api result when GET to /popularity is called', async () => {
    const interests = { some: 'interests' }

    mocked(googleTrends).interestOverTime.mockImplementation(
      (): Promise<any> => {
        return Promise.resolve(interests)
      }
    )

    await request(createApp(appConfig))
      .get('/popularity?keyword=SomeKeyWord')
      .expect(200, interests)

    expect(
      mocked(googleTrends).interestOverTime.mock.calls[0][0]
    ).toStrictEqual({
      keyword: 'SomeKeyWord',
    })
  })

  it('should return error when GET to /popularity is called and google-trends-api fails', async () => {
    const interests = { some: 'interests' }

    mocked(googleTrends).interestOverTime.mockImplementation(
      (): Promise<any> => {
        return Promise.reject('Interest Over Time fails')
      }
    )

    await request(createApp(appConfig))
      .get('/popularity?keyword=SomeKeyWord')
      .expect(502, {
        error: 'google-trends-api',
        detail: 'Call to Google Trends API call failed',
      })
  })

  it('should return error when GET to /popularity is called with no keyword query', async () => {
    const interests = { some: 'interests' }

    mocked(googleTrends).interestOverTime.mockImplementation(
      (): Promise<any> => {
        return Promise.reject('Interest Over Time fails')
      }
    )

    await request(createApp(appConfig)).get('/popularity').expect(400, {
      error: `Missing: keyword`,
      detail:
        'The call requries the missing url to have query params that are missing',
    })
  })
})
