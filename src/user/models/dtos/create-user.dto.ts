import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto implements Partial<User> {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string
}
