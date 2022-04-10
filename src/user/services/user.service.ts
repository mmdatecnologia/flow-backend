import { CreateUserDto } from '@app/user/models/dtos/create-user.dto'
import { GetUserDto } from '@app/user/models/dtos/get-user.dto'
import { UserEntity } from '@app/user/models/user.entity'
import { UseCase } from '@app/user/services/service.interface'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

@Injectable()
export class UserService implements UseCase.CreateUser {
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
}