import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateUserDto implements Partial<User> {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string
}
