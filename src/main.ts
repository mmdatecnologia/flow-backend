import { AppModule } from '@app/app.module'
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import * as csurf from 'csurf'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      validationError: { target: true, value: true },
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )
  app.enableVersioning({
    type: VersioningType.URI
  })
  const configService = app.get(ConfigService)
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('app.name'))
    .setDescription(configService.get<string>('app.description'))
    .setVersion(configService.get<string>('app.version'))
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)
  app.use(helmet())
  app.enableCors()
  app.use(csurf())
  await app.listen(configService.get<number>('app.port') ?? 3000)
}
bootstrap()
  .then(() => true)
  .catch((err) => console.error(err))
