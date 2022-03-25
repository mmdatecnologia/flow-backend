import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { RedisCacheModule } from '@app/cache/redis-cache.module'
import { configuration } from '@app/config/configuration'
import { validationSchema } from '@app/config/validation/validation'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
      validationSchema
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          ttl: configService.get<number>('throttler.ttl'),
          limit: configService.get<number>('throttler.limit')
        }
      }
    }),
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
