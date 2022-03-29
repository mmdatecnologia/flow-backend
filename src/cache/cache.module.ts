import { CacheService } from '@app/cache/cache.service'
import { CacheModule as NestCacheModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { configFactory } from './cache.config'

@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: configFactory
    })
  ],
  exports: [CacheService],
  providers: [CacheService]
})
export class CacheModule {}
