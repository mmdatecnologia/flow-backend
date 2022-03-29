import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging'),
  APP_NAME: Joi.string(),
  APP_DESCRIPTION: Joi.string(),
  APP_VERSION: Joi.string(),
  PORT: Joi.number(),
  CACHE_STORE: Joi.string().valid('redis', 'memory'),
  CACHE_HOST: Joi.string(),
  CACHE_PORT: Joi.number(),
  CACHE_TTL: Joi.number(),
  THROTTLER_TTL: Joi.number(),
  THROTTLER_LIMIT: Joi.number(),
  DB_TYPE: Joi.string().valid('mysql', 'mongo'),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_HOST: Joi.string(),
  DB_NAME: Joi.string(),
  DB_PORT: Joi.number(),
  DB_URL: Joi.string()
})
