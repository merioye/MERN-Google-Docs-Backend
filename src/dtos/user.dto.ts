import { RegisterArgs } from '../types/user.types'

interface User extends RegisterArgs {
  id: string
}

class UserDto {
  id: string
  name: string
  email: string
  profile: string

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.profile = user.profile
  }
}

export default UserDto
