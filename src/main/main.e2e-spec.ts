import { CacheModule } from '@app/cache/cache.module'
import { ConfigModule } from '@app/config/config.module'
import { MemoryDb } from '@app/database/mocks/memory-db.mock'
import { HttpModule } from '@nestjs/axios'
import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'

import { MainController } from './main.controller'
import { MainService } from './main.service'

jest.setTimeout(30000)

describe('AppController (e2e)', () => {
  let app: INestApplication
  const memoryDb = new MemoryDb()
  beforeAll(async () => {
    await memoryDb.initialize()
    const moduleBuilder: TestingModuleBuilder = Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule,
        ThrottlerModule,
        CacheModule,
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async () => ({
            type: 'mongodb',
            url: memoryDb.getUri(),
            entities: [__dirname + '../**/*.entity.ts'],
            synchronize: true,
            autoLoadEntities: true,
            useUnifiedTopology: true,
            keepConnectionAlive: true,
            useNewUrlParser: true,
            logging: true
          })
        }),
        TerminusModule
      ],
      controllers: [MainController],
      providers: [MainService]
    })
    const moduleFixture: TestingModule = await moduleBuilder.compile()
    app = moduleFixture.createNestApplication()
  })
  beforeEach(async () => {
    await memoryDb.cleanup()
    await app.init()
    await app.listen(3000)
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await memoryDb.shutdown()
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
