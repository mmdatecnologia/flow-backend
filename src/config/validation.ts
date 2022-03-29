import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),
  APP_NAME: Joi.string().default('NestApplication'),
  APP_DESCRIPTION: Joi.string().default('NestApplication'),
  APP_VERSION: Joi.string().required(),
  PORT: Joi.number().default(3000),
  CACHE_STORE: Joi.string().valid('redis', 'memory').default('memory'),
  CACHE_HOST: Joi.string().default('localhost'),
  CACHE_PORT: Joi.number().default(6379),
  CACHE_TTL: Joi.number().default(60),
  THROTTLER_TTL: Joi.number().default(60),
  THROTTLER_LIMIT: Joi.number().default(100)
})
