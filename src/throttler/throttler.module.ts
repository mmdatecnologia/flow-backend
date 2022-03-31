import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule as NestThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'

@Module({
  imports: [
    NestThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<ThrottlerModuleOptions> => {
        return {
          ttl: configService.get<number>('throttler.ttl'),
          limit: configService.get<number>('throttler.limit')
        }
      }
    })
  ]
})
export class ThrottlerModule {}
