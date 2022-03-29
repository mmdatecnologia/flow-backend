import { CacheService } from '@app/cache/cache.service'
import { CacheModule } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

describe('AppController', () => {
  let cacheService: CacheService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [CacheService]
    }).compile()

    cacheService = app.get<CacheService>(CacheService)
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
