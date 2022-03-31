import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { configFactory } from './cache.config'

describe('CacheConfig', () => {
  let configService: ConfigService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: []
    }).compile()

    configService = moduleRef.get<ConfigService>(ConfigService)
  })

  it('should be defined', async () => {
    jest.spyOn(configService, 'get').mockReturnValueOnce('redis')
    const configuration = await configFactory(configService)
    expect(configuration).toHaveProperty('store')
    expect(configuration).toHaveProperty('host')
    expect(configuration).toHaveProperty('port')
    expect(configuration).toHaveProperty('ttl')
    expect(configuration).toHaveProperty('password')
    expect(configuration).toHaveProperty('prefix')
    expect(configuration).toHaveProperty('isGlobal')
  })
})
