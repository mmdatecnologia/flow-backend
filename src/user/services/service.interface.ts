import { CreateUserDto, GetUserDto, UpdateUserDto, User } from '@app/user/models'

export namespace UseCase {
  export interface CreateUser {
    create(data: CreateUserDto): Promise<GetUserDto>
  }

  export interface FindOne {
    findOne(id: string): Promise<GetUserDto>
  }

  export interface FindAll {
    findAll(): Promise<GetUserDto[]>
  }

  export interface UpdateUser {
    update(id: string, data: UpdateUserDto): Promise<GetUserDto>
  }

  export interface DeleteUser {
    delete(id: string): Promise<void>
  }

  export interface ValidateUser {
    validate(data: User): Promise<User>
  }
}
