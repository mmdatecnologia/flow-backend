import { ConfigModule } from '@app/config/config.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { configFactory } from './database.config'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: configFactory
    })
  ]
})
export class DatabaseModule {}
