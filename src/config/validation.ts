import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging'),
  APP_NAME: Joi.string().exist(),
  APP_DESCRIPTION: Joi.string().exist(),
  APP_VERSION: Joi.string().exist(),
  PORT: Joi.number().exist(),
  CACHE_STORE: Joi.string().valid('redis', 'memory').exist(),
  CACHE_HOST: Joi.string().exist(),
  CACHE_PASSWORD: Joi.string().exist(),
  CACHE_PORT: Joi.number().exist(),
  CACHE_TTL: Joi.number().exist(),
  CACHE_PREFIX: Joi.string().exist(),
  THROTTLER_TTL: Joi.number().exist(),
  THROTTLER_LIMIT: Joi.number().exist(),
  DB_TYPE: Joi.string().valid('mysql', 'mongodb').exist(),
  DB_USERNAME: Joi.string().exist(),
  DB_PASSWORD: Joi.string().exist(),
  DB_HOST: Joi.string().exist(),
  DB_NAME: Joi.string().exist(),
  DB_PORT: Joi.number().exist(),
  DB_URL: Joi.string().exist()
})
