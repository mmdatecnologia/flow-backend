import { CacheModuleOptions } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-ioredis'

import { CacheType } from './cache.contract'

export const configFactory = async (configService: ConfigService): Promise<CacheModuleOptions> => {
  if (configService.get<string>('cache.store') === CacheType.REDIS) {
    return {
      store: redisStore,
      host: configService.get<string>('cache.host'),
      port: configService.get<string>('cache.port'),
      ttl: configService.get<number>('cache.ttl'),
      password: configService.get<string>('cache.password'),
      prefix: configService.get<string>('cache.prefix'),
      isGlobal: true
    }
  }
}
