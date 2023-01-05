import bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql'

import { HASH_SALT_ROUNDS } from '../config/constants'

class HashService {
  hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS)
      return await bcrypt.hash(password, salt)
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }

  comparePassword = async (inputPassword: string, hashedPassword: string) => {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword)
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }
}

export default new HashService()
