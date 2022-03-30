import { Test, TestingModule } from '@nestjs/testing'

import { MainService } from './main.service'

describe('MainService', () => {
  let mainService: MainService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MainService]
    }).compile()

    mainService = app.get<MainService>(MainService)
  })

  it('should be defined"', () => {
    expect(mainService).toBeDefined()
  })
  it('should return "Hello World!"', () => {
    expect(mainService.getHello()).toBe('Hello World!')
  })
})
