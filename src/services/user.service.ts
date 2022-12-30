import { pool } from '../config/db'
import { RegisterArgs } from '../types/user.types'
import { errorHandler } from '../utils/errorHandler'

class UserService {
  findUser = async (filter: { field: string; value: string }) => {
    try {
      const { field, value } = filter
      const query = `SELECT * FROM "users" WHERE "${field}" = $1`
      const result = await pool.query(query, [value])
      return result.rows[0]
    } catch (e) {
      errorHandler(500)
    }
  }

  createUser = async (user: RegisterArgs) => {
    try {
      const { name, email, password, profile } = user
      const query = 'INSERT INTO users(name,email,password,profile) VALUES($1,$2,$3,$4) RETURNING *'
      const result = await pool.query(query, [name, email, password, profile])
      return result.rows[0]
    } catch (_) {
      errorHandler(500)
    }
  }
}

export default new UserService()
