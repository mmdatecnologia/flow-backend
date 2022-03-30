import { CacheHealthIndicator } from '@app/cache/health.indicator'
import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'

@Controller()
export class MainController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private cache: CacheHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('dependency-api', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('database'),
      () => this.cache.isHealthy('cache')
    ])
  }
}
