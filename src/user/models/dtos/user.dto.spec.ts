import { User } from '../user.interface'
import { UserDto } from './user.dto'

describe('UserDto', () => {
  it('should be has user interface properties', () => {
    const data: User = {
      id: '1',
      username: 'test',
      email: 'dummy@email.com',
      password: 'dummy'
    }
    const userDto = Object.assign(new UserDto(), data)
    expect(userDto).toHaveProperty('id')
    expect(userDto.id).toEqual(data.id)
    expect(userDto).toHaveProperty('username')
    expect(userDto.username).toEqual(data.username)
    expect(userDto).toHaveProperty('email')
    expect(userDto.password).toEqual(data.password)
    expect(userDto).toHaveProperty('password')
    expect(userDto.password).toEqual(data.password)
  })
})
