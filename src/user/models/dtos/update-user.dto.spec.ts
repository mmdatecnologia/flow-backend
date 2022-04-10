import { validate } from 'class-validator'

import { UpdateUserDto } from './update-user.dto'

describe('UpdateUserDto', () => {
  let updateUserDto: UpdateUserDto
  it('should be validate without erros', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.email = 'dummy@email.com'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(0)
  })
  it('should be validate a valid email', async () => {
    updateUserDto = new UpdateUserDto()
    updateUserDto.email = 'wrong_email'
    const result = await validate(updateUserDto)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('email')
    expect(result[0].constraints.isEmail).toBe('email must be an email')
  })
})
