import { validate } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

describe('CreateUserDto', () => {
  let createUserDto: CreateUserDto
  it('should be validate without erros', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.username = 'dummy'
    createUserDto.email = 'dummy@email.com'
    createUserDto.password = 'Dummy@dummy123'
    createUserDto.confirmPassword = 'Dummy@dummy123'
    const result = await validate(createUserDto)
    expect(result.length).toBe(0)
  })
  it('should be validate a valid email', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.username = 'dummy'
    createUserDto.email = 'wrong_email'
    createUserDto.password = 'Dummy@dummy123'
    createUserDto.confirmPassword = 'Dummy@dummy123'
    const result = await validate(createUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('email')
    expect(result[0].constraints.isEmail).toBe('email must be an email')
  })
  it('should be validate a weak password', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.username = 'dummy'
    createUserDto.email = 'dummy@email.com'
    createUserDto.password = 'weak_password'
    createUserDto.confirmPassword = 'weak_password'
    const result = await validate(createUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('password')
    expect(result[0].constraints.matches).toBe('password too weak')
  })
  it('should be validate confirm password', async () => {
    createUserDto = new CreateUserDto()
    createUserDto.username = 'dummy'
    createUserDto.email = 'dummy@email.com'
    createUserDto.password = 'Dummy@dummy123'
    createUserDto.confirmPassword = 'wrong@dummy123'
    const result = await validate(createUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('confirmPassword')
    expect(result[0].constraints.isEqualTo).toBe('confirmPassword must match password exactly')
  })
})
