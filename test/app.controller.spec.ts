import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { CacheHealthIndicator } from '@app/cache/health.indicator'
import { createMock } from '@golevelup/nestjs-testing'
import { HttpHealthIndicator, TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController', () => {
  let appController: AppController
  const cacheHealthIndicator = createMock<CacheHealthIndicator>()
  const httpHealthIndicator = createMock<HttpHealthIndicator>()
  const typeOrmHealthIndicator = createMock<TypeOrmHealthIndicator>()

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [AppController],
      providers: [
        { provide: CacheHealthIndicator, useValue: cacheHealthIndicator },
        { provide: HttpHealthIndicator, useValue: httpHealthIndicator },
        { provide: TypeOrmHealthIndicator, useValue: typeOrmHealthIndicator },
        { provide: CacheHealthIndicator, useValue: cacheHealthIndicator },
        AppService
      ]
    }).compile()

    appController = app.get<AppController>(AppController)
  })
  it('should be defined"', () => {
    expect(appController).toBeDefined()
  })
  it('should be check"', async () => {
    cacheHealthIndicator.isHealthy.mockImplementation(async (key: string) => ({ [key]: { status: 'up' } }))
    httpHealthIndicator.pingCheck.mockImplementation(async (key: string) => ({ [key]: { status: 'up' } }))
    typeOrmHealthIndicator.pingCheck.mockImplementation(async (key: string) => ({ [key]: { status: 'up' } }))
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
    expect(await appController.check()).toEqual(expected)
  })
})
