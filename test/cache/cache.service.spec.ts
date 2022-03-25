import { Test, TestingModule } from '@nestjs/testing'
import { RedisCacheService } from '@app/cache/redis-cache.service'
import { CacheModule } from '@nestjs/common'

describe('AppController', () => {
  let cacheService: RedisCacheService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [RedisCacheService]
    }).compile()

    cacheService = app.get<RedisCacheService>(RedisCacheService)
  })

  it('should be defined"', () => {
    expect(cacheService).toBeDefined()
  })
  it('should be persist a item on cache"', async () => {
    const key = 'test'
    const value = 'test'
    await cacheService.set(key, value)
    const result = await cacheService.get(key)
    expect(result).toBeTruthy()
    expect(result).toBe(value)
  })
  it('should be remove a item on cache"', async () => {
    const key = 'test'
    const value = 'test'
    await cacheService.set(key, value)
    await cacheService.delete(key)
    const result = await cacheService.get(key)
    expect(result).toBeFalsy()
    expect(result).toBe(undefined)
  })
})
