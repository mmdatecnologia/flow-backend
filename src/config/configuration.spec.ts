import { config, DotenvConfigOptions } from 'dotenv'

import { Configuration, configuration } from './configuration'

const dotenvConfig: DotenvConfigOptions = {
  path: `${process.cwd()}/${process.env.NODE_ENV}.env`,
  encoding: 'utf8',
  override: true,
  debug: true
}
config(dotenvConfig)

describe('Configuration', () => {
  let configs: Configuration

  beforeEach(async () => {
    configs = configuration()
  })

  it('should be defined', () => {
    expect(configs.env).toBeTruthy()
    expect(configs.app.description).toBeTruthy()
    expect(configs.app.name).toBeTruthy()
    expect(configs.app.port).toBeTruthy()
    expect(configs.app.version).toBeTruthy()
    expect(configs.throttler.limit).toBeTruthy()
    expect(configs.throttler.ttl).toBeTruthy()
    expect(configs.cache.host).toBeTruthy()
    expect(configs.cache.password).toBeTruthy()
    expect(configs.cache.port).toBeTruthy()
    expect(configs.cache.prefix).toBeTruthy()
    expect(configs.cache.store).toBeTruthy()
    expect(configs.cache.ttl).toBeTruthy()
    expect(configs.db.host).toBeTruthy()
    expect(configs.db.name).toBeTruthy()
    expect(configs.db.password).toBeTruthy()
    expect(configs.db.port).toBeTruthy()
    expect(configs.db.port).toBeTruthy()
    expect(configs.db.type).toBeTruthy()
    expect(configs.db.url).toBeTruthy()
  })
})
