import { User } from '@app/user/models/user.interface'

import { GetUserDto } from './get-user.dto'

describe('GetUserDto', () => {
  it('should be has user interface properties', () => {
    const data: Partial<User> = {
      username: 'test',
      email: 'dummy@email.com'
    }
    const userDto = Object.assign(new GetUserDto(), data)
    expect(userDto).toHaveProperty('username')
    expect(userDto.username).toEqual(data.username)
    expect(userDto).toHaveProperty('email')
    expect(userDto.password).toEqual(data.password)
  })
})
