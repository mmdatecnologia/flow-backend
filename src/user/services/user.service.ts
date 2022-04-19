import { CreateUserDto, GetUserDto, UpdateUserDto, UserEntity } from '@app/user/models'
import { UseCase } from '@app/user/services'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

@Injectable()
export class UserService implements UseCase.CreateUser, UseCase.FindOne, UseCase.FindAll, UseCase.UpdateUser {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>
  ) {}

  async create(user: CreateUserDto): Promise<GetUserDto> {
    const newUserEntity = Object.assign(new UserEntity(), user)
    const userCreated = await this.userRepository.save<UserEntity>(newUserEntity)
    const { id, email } = userCreated
    return Object.assign(new GetUserDto(), { id, email })
  }

  async findOne(id: string): Promise<GetUserDto> {
    const findUserEntity = await this.userRepository.findOne({ id })
    if (!findUserEntity) {
      return undefined
    }
    const { email } = findUserEntity
    return Object.assign(new GetUserDto(), { id, email })
  }

  async findAll(): Promise<GetUserDto[]> {
    const result = await this.userRepository.find({})
    if (result.length === 0) {
      return []
    }
    return result.map(({ id, email }) => Object.assign(new GetUserDto(), { id, email }))
  }

  async update(id: string, data: UpdateUserDto): Promise<GetUserDto> {
    const findUserEntity = await this.userRepository.findOne({ id })
    if (!findUserEntity) {
      return undefined
    }
    Object.assign(findUserEntity, { ...data })
    await this.userRepository.save<UserEntity>(findUserEntity)
    return Object.assign(new GetUserDto(), { ...findUserEntity })
  }
}
