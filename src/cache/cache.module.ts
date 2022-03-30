import { CacheService } from '@app/cache/cache.service'
import { CacheModule as NestCacheModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { configFactory } from './cache.config'
import { CacheHealthIndicator } from './health.indicator'

@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: configFactory
    })
  ],
  exports: [CacheService, CacheHealthIndicator],
  providers: [CacheService, CacheHealthIndicator]
})
export class CacheModule {}
