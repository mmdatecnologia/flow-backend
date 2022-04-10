import { validate } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

describe('CreateUserDto', () => {
  let createUserDto: CreateUserDto
  it('should be validate without erros', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.email = 'dummy@email.com'
    const result = await validate(createUserDto)
    expect(result.length).toBe(0)
  })
  it('should be validate a valid email', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.email = 'wrong_email'
    const result = await validate(createUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('email')
    expect(result[0].constraints.isEmail).toBe('email must be an email')
  })
})
