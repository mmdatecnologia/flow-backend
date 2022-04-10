import { CreateUserDto } from '@app/user/models/dtos/create-user.dto'
import { GetUserDto } from '@app/user/models/dtos/get-user.dto'
import { UserEntity } from '@app/user/models/user.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { UseCase } from './service.interface'

@Injectable()
export class UserService implements UseCase.CreateUser {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: MongoRepository<UserEntity>
  ) {}
  async create(user: CreateUserDto): Promise<GetUserDto> {
    throw new Error(user + ' is not provided')
  }
}
