import { CacheType } from '@app/cache/cache.contract'
import { CacheService } from '@app/cache/cache.service'
import { CacheModule as NestCacheModule, CacheModuleOptions, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-ioredis'

@Module({
  imports: [
    NestCacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<CacheModuleOptions> => {
        if (configService.get<string>('cache.store') === CacheType.REDIS) {
          return {
            store: redisStore,
            host: configService.get<string>('cache.host'),
            port: configService.get<number>('cache.port'),
            ttl: configService.get<number>('cache.ttl'),
            isGlobal: true
          }
        }
      }
    })
  ],
  exports: [CacheService],
  providers: [CacheService]
})
export class CacheModule {}
