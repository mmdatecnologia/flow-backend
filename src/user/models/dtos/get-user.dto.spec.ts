import { UserEmail } from '@app/user/models/user.types'

import { GetUserDto } from './get-user.dto'

describe('GetUserDto', () => {
  it('should be has user interface properties', () => {
    const data: UserEmail = {
      email: 'dummy@email.com'
    }
    const userDto = Object.assign(new GetUserDto(), data)
    expect(userDto).toHaveProperty('email')
    expect(userDto.email).toEqual(data.email)
  })
})
