import bcrypt from 'bcryptjs'

import { HASH_SALT_ROUNDS } from '../config/constants'
import { errorHandler } from '../utils/errorHandler'

class HashService {
  hashPassword = async (password: string) => {
    try {
      const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS)
      return await bcrypt.hash(password, salt)
    } catch (_) {
      errorHandler(500)
    }
  }

  comparePassword = async (inputPassword: string, hashedPassword: string) => {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword)
    } catch (_) {
      errorHandler(500)
    }
  }
}

export default new HashService()
