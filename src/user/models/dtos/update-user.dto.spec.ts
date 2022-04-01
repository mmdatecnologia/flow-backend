import { validate } from 'class-validator'

import { UpdateUserDto } from './update-user.dto'

describe('UpdateUserDto', () => {
  let updateUserDto: UpdateUserDto
  it('should be validate without erros', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.username = 'dummy'
    updateUserDto.email = 'dummy@email.com'
    updateUserDto.password = 'Dummy@dummy123'
    updateUserDto.confirmPassword = 'Dummy@dummy123'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(0)
  })
  it('should be validate a valid email', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.username = 'dummy'
    updateUserDto.email = 'wrong_email'
    updateUserDto.password = 'Dummy@dummy123'
    updateUserDto.confirmPassword = 'Dummy@dummy123'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('email')
    expect(result[0].constraints.isEmail).toBe('email must be an email')
  })
  it('should be validate a weak password', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.username = 'dummy'
    updateUserDto.email = 'dummy@email.com'
    updateUserDto.password = 'weak_password'
    updateUserDto.confirmPassword = 'weak_password'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('password')
    expect(result[0].constraints.matches).toBe('password too weak')
  })
  it('should be validate confirm password', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.username = 'dummy'
    updateUserDto.email = 'dummy@email.com'
    updateUserDto.password = 'Dummy@dummy123'
    updateUserDto.confirmPassword = 'wrong@dummy123'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('confirmPassword')
    expect(result[0].constraints.isEqualTo).toBe('confirmPassword must match password exactly')
  })
  it('should be validate confirm password if password exist', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.username = 'dummy'
    updateUserDto.email = 'dummy@email.com'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(0)
  })
})
