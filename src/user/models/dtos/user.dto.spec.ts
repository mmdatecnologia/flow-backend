import { UserEmail } from '@app/user/models/user.types'

import { UserDto } from './user.dto'

describe('UserDto', () => {
  it('should be has user interface properties', () => {
    const data: UserEmail = {
      email: 'dummy@email.com'
    }
    const userDto = Object.assign(new UserDto(), data)
    expect(userDto).toHaveProperty('email')
    expect(userDto.email).toEqual(data.email)
  })
})
