import { CacheHealthIndicator } from '@app/cache/health.indicator'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus'

@ApiTags('Health Check')
@Controller()
export class MainController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private cache: CacheHealthIndicator,
    private db: TypeOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    const result = await this.health.check([
      () => this.http.pingCheck('dependency-api', 'https://docs.nestjs.com'),
      () => this.cache.isHealthy('cache'),
      () => this.db.pingCheck('database')
    ])
    return result
  }
}
