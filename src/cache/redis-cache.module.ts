import { CacheEnum } from '@app/cache/cache.enum'
import { RedisCacheService } from '@app/cache/redis-cache.service'
import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-ioredis'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<CacheModuleOptions> => {
        if (configService.get<string>('cache.store') === CacheEnum.REDIS) {
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
  exports: [RedisCacheService],
  providers: [RedisCacheService]
})
export class RedisCacheModule {}
