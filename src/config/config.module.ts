import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { configuration } from './configuration'
import { validationSchema } from './validation'

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
      validationSchema
    })
  ],
  controllers: [],
  providers: []
})
export class ConfigModule {}
