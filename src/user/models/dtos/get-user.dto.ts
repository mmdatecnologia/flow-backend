import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'

export class GetUserDto implements Partial<User> {
  @ApiProperty()
  username: string
  @ApiProperty()
  email: string
}
