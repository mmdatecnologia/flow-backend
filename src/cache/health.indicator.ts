import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'

import { CACHE_HEALTH_KEY, CACHE_HEALTH_MSG_ERROR, CACHE_HEALTH_VALUE } from './cache.constants'
import { CacheService } from './cache.service'

@Injectable()
export class CacheHealthIndicator extends HealthIndicator {
  constructor(private readonly cacheService: CacheService) {
    super()
  }
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    await this.cacheService.set(CACHE_HEALTH_KEY, CACHE_HEALTH_VALUE)
    const StoredValue = await this.cacheService.get(CACHE_HEALTH_KEY)
    await this.cacheService.del(CACHE_HEALTH_KEY)
    const isHealthy = StoredValue === CACHE_HEALTH_VALUE
    const result = this.getStatus(key, isHealthy)

    if (isHealthy) {
      return result
    }
    throw new HealthCheckError(CACHE_HEALTH_MSG_ERROR, result)
  }
}
