import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'

export class GetUserDto implements User {
  @ApiProperty()
  id: string
  @ApiProperty()
  email: string
}
