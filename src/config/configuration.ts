export interface Configuration {
  env: 'development' | 'production' | 'test' | string
  app: {
    name: string
    description: string
    version: string
    port: number
  }
  throttler: {
    ttl: number
    limit: number
  }
  cache: {
    store: 'redis' | 'memory' | string
    host: string
    password: string
    port: number
    ttl: number
    prefix: string
  }
  db: {
    type: 'mysql' | 'mongodb' | string
    username: string
    password: string
    host: string
    name: string
    port: number
    url: string
  }
}

export const configuration = (): Configuration => ({
  env: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    port: parseInt(process.env.PORT, 10)
  },
  throttler: {
    ttl: parseInt(process.env.THROTTLER_TTL, 10),
    limit: parseInt(process.env.THROTTLER_LIMIT, 10)
  },
  cache: {
    store: process.env.CACHE_STORE,
    host: process.env.CACHE_HOST,
    password: process.env.CACHE_PASSWORD,
    port: parseInt(process.env.CACHE_PORT, 10),
    ttl: parseInt(process.env.CACHE_TTL, 10),
    prefix: process.env.CACHE_PREFIX
  },
  db: {
    type: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    url: process.env.DB_URL
  }
})
