import { CreateUserDto, GetUserDto, UserEntity } from '@app/user/models'
import { UserService } from '@app/user/services/user.service'
import { createMock } from '@golevelup/nestjs-testing'
import { Test, TestingModule } from '@nestjs/testing'
import * as faker from 'faker-br'
import { MongoRepository } from 'typeorm'

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
  describe('create', () => {
    it('should call repository with correct params', async () => {
      userRepository.save = jest.fn().mockResolvedValue(new UserEntity())
      const user = new CreateUserDto()

      await service.create(user)

      expect(userRepository.save).toHaveBeenCalledTimes(1)
      expect(userRepository.save).toHaveBeenCalledWith(user)
    })
    it('should return a GetUserDto instance with correct data', async () => {
      const mockedUserEmail = faker.internet.email()
      const mockedUserId = faker.random.uuid()
      const createUserDto = new CreateUserDto()
      const mockedUserEntity = new UserEntity()

      mockedUserEntity.id = mockedUserId
      mockedUserEntity.email = mockedUserEmail
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUserEntity)

      createUserDto.email = mockedUserEmail
      const userCreated = await service.create(createUserDto)

      expect(userCreated).toBeInstanceOf(GetUserDto)
      expect(userCreated.email).toBe(createUserDto.email)
      expect(userCreated).toHaveProperty('id')
      expect(userCreated.id).toBe(mockedUserId)
    })
    it('should throw an error if repository throws an error', async () => {
      jest.spyOn(userRepository, 'save').mockImplementationOnce(() => {
        throw new Error()
      })
      const createUserDto = new CreateUserDto()
      expect(service.create(createUserDto)).rejects.toThrow()
    })
  })
})
