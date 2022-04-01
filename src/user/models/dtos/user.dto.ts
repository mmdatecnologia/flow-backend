import { User } from '@app/user/models/user.interface'

export class UserDto implements User {
  id: string
  username: string
  email: string
  password: string
}
