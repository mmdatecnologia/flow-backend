import { CreateUserDto } from '@app/user/models/dtos/create-user.dto'
import { GetUserDto } from '@app/user/models/dtos/get-user.dto'
import { UpdateUserDto } from '@app/user/models/dtos/update-user.dto'
import { User } from '@app/user/models/user.interface'

export interface CreateUser {
  create(user: CreateUserDto): Promise<GetUserDto>
}

export interface GetUser {
  get(id: string): Promise<GetUserDto>
}

export interface GetUsers {
  list(): Promise<GetUserDto[]>
}

export interface UpdateUser {
  update(user: UpdateUserDto): Promise<GetUserDto>
}

export interface DeleteUser {
  delete(id: string): Promise<void>
}

export interface ValidateUser {
  validate(user: User): Promise<User>
}
