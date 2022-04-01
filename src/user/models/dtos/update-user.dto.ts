import { IsEqualTo } from '@app/decorators/is-equal-to.decorator'
import { User } from '@app/user/models/user.interface'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator'

export class UpdateUserDto implements Partial<User> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  @IsOptional()
  password?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.password)
  @IsEqualTo<UpdateUserDto>('password')
  confirmPassword?: string
}
