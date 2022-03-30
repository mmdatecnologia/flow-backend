import { CacheModule } from '@app/cache/cache.module'
import { ConfigModule } from '@app/config/config.module'
import { DatabaseModule } from '@app/database/database.module'
import { ThrottlerModule } from '@app/throttler/throttler.module'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { MainController } from './main.controller'
import { MainService } from './main.service'

@Module({
  imports: [HttpModule, ConfigModule, ThrottlerModule, CacheModule, DatabaseModule, TerminusModule],
  controllers: [MainController],
  providers: [MainService]
})
export class AppModule {}
