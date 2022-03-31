import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { ConfigModule } from '../config/config.module'
import { configFactory } from './database.config'

describe('DatabaseConfig', () => {
  let configService: ConfigService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: []
    }).compile()

    configService = moduleRef.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(configFactory(configService)).toBeTruthy()
  })
})
