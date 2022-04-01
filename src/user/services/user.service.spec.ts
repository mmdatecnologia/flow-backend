import { UserEntity } from '@app/user/models/user.entity'
import { createMock } from '@golevelup/nestjs-testing'
import { Test, TestingModule } from '@nestjs/testing'
import { MongoRepository } from 'typeorm'

import { CreateUserDto } from '../models/dtos/create-user.dto'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  const userRepository = createMock<MongoRepository<UserEntity>>()
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: 'UserEntityRepository', useValue: userRepository }, UserService]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should be defined', () => {
    const user = new CreateUserDto()
    expect(service.create(user)).rejects.toThrow()
  })
})
