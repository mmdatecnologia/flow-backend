import { CACHE_HEALTH_VALUE } from '@app/cache/cache.constants'
import { CacheService } from '@app/cache/cache.service'
import { CacheHealthIndicator } from '@app/cache/health.indicator'
import { createMock } from '@golevelup/nestjs-testing'
import { Test } from '@nestjs/testing'

describe('HealthIndicator', () => {
  let healthIndicator: CacheHealthIndicator
  const cacheService = createMock<CacheService>()
  cacheService.get.mockResolvedValue(CACHE_HEALTH_VALUE)
  cacheService.set.mockResolvedValue(undefined)
  cacheService.del.mockResolvedValue(undefined)
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [{ provide: CacheService, useValue: cacheService }, CacheHealthIndicator]
    }).compile()

    healthIndicator = moduleRef.get<CacheHealthIndicator>(CacheHealthIndicator)
  })

  it('should be defined', () => {
    expect(healthIndicator).toBeDefined()
  })

  it('should be perform a isHealthy', async () => {
    const redisSetCacheSpy = jest.spyOn(cacheService, 'set')
    const redisGetCacheSpy = jest.spyOn(cacheService, 'get')
    const redisDelCacheSpy = jest.spyOn(cacheService, 'del')
    const result = await healthIndicator.isHealthy('test')
    expect(result).toBeTruthy()
    expect(result.test.status).toBe('up')
    expect(redisSetCacheSpy).toHaveBeenCalled()
    expect(redisGetCacheSpy).toHaveBeenCalled()
    expect(redisDelCacheSpy).toHaveBeenCalled()
  })
  it('should not perform a isHealthy', async () => {
    cacheService.get.mockResolvedValue(undefined)
    expect(healthIndicator.isHealthy('test')).rejects.toThrowError()
  })
})
