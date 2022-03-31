import { config, DotenvConfigOptions } from 'dotenv'

import { validationSchema } from './validation'

describe('ValidationSpec', () => {
  beforeEach(async () => {
    const dotenvConfig: DotenvConfigOptions = {
      path: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      encoding: 'utf8',
      override: true,
      debug: true
    }
    config(dotenvConfig)
  })

  it('should be apply validation', () => {
    const result = validationSchema.options({ allowUnknown: true }).validate(process.env)
    expect(result.error).toBeFalsy()
  })
})
