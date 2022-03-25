import { RedisCacheService } from '@app/cache/redis-cache.service'
import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-ioredis'
import { CacheEnum } from '@app/cache/cache.enum'

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
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
        } else {
          return null
        }
      }
    })
  ],
  exports: [RedisCacheService],
  providers: [RedisCacheService]
})
export class RedisCacheModule {}
