import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { CacheModule } from '@app/cache/cache.module'
import { ConfigModule } from '@app/config/config.module'
import { DatabaseModule } from '@app/database/database.module'
import { ThrottlerModule } from '@app/throttler/throttler.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [ConfigModule, ThrottlerModule, CacheModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
