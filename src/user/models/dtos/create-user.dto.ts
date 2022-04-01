import { IsEqualTo } from '@app/decorators/is-equal-to.decorator'
import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

export class CreateUserDto implements Partial<User> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEqualTo<CreateUserDto>('password')
  confirmPassword: string
}
