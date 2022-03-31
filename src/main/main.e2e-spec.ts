import { MemoryDb } from '@app/database/mocks/memory-db.mock'
import { MainModule } from '@app/main/main.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

jest.setTimeout(30000)
describe('AppController (e2e)', () => {
  let app: INestApplication
  const memoryDb = new MemoryDb()
  beforeAll(async () => {
    await memoryDb.initialize()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    await memoryDb.cleanup()
  })

  afterAll(async () => {
    await memoryDb.shutdown()
    await app.close()
  })

  it('/ (GET)', () => {
    const expected = {
      status: 'ok',
      info: {
        'dependency-api': {
          status: 'up'
        },
        database: {
          status: 'up'
        },
        cache: {
          status: 'up'
        }
      },
      error: {},
      details: {
        'dependency-api': {
          status: 'up'
        },
        database: {
          status: 'up'
        },
        cache: {
          status: 'up'
        }
      }
    }
    return request(app.getHttpServer()).get('/').expect(200).expect(expected)
  })
})
