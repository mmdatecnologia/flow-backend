export const configuration = (): Record<string, unknown> => ({
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME || 'NestApplication',
    description: process.env.APP_DESCRIPTION || 'NestApplication',
    version: process.env.APP_VERSION || '0.0.1',
    port: parseInt(process.env.PORT, 10) || 3000
  },
  cache: {
    store: process.env.CACHE_STORE,
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    ttl: process.env.CACHE_TTL
  }
})
