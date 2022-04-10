import { CreateUserDto, GetUserDto, UpdateUserDto, User } from '@app/user/models'

export interface CreateUser {
  create(user: CreateUserDto): Promise<GetUserDto>
}

export interface GetUser {
  findOne(id: string): Promise<GetUserDto>
}

export interface GetUsers {
  findAll(): Promise<GetUserDto[]>
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
