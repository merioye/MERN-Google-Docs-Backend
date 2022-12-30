import { SESSION_COOKIE_NAME } from '../../config/constants'
import UserDto from '../../dtos/user.dto'
import hashService from '../../services/hash.service'
import userService from '../../services/user.service'
import { MyContext } from '../../types/shared.types'
import {
  AuthMutationResponse,
  LoginArgs,
  RegisterArgs,
  UserQueryResponse,
} from '../../types/user.types'
import { errorHandler } from '../../utils/errorHandler'
import { loginSchema, registerSchema } from '../../validations/user.validation'

const resolvers = {
  Query: {
    whoAmI: async (_: any, __: any, { req }: MyContext): Promise<UserQueryResponse> => {
      const userId = req.session?.userId
      if (!userId) errorHandler(401, 'User is not authenticated')

      const user = await userService.findUser({ field: 'id', value: userId as string })
      const transformedUser = new UserDto(user)
      return {
        code: 200,
        success: true,
        message: 'Successful',
        user: transformedUser,
      }
    },
  },
  Mutation: {
    register: async (_: any, args: RegisterArgs): Promise<AuthMutationResponse> => {
      const { email, password } = args

      const { error } = registerSchema.validate(args)
      if (error) errorHandler(400, error.message)

      const user = await userService.findUser({ field: 'email', value: email })
      if (user) errorHandler(409, 'User already exists')

      const hashedPassword = await hashService.hashPassword(password)

      const newUser = await userService.createUser({
        ...args,
        password: hashedPassword as string,
      })

      const transformedUser = new UserDto(newUser)
      return {
        code: 201,
        success: true,
        message: 'User registered successfully',
        user: transformedUser,
      }
    },

    login: async (_: any, args: LoginArgs, { req }: MyContext): Promise<AuthMutationResponse> => {
      const { email, password } = args

      const { error } = loginSchema.validate(args)
      if (error) errorHandler(400, error.message)

      const user = await userService.findUser({ field: 'email', value: email })
      if (!user) errorHandler(404, 'Invalid credentials')

      const isMatched = await hashService.comparePassword(password, user.password)
      if (!isMatched) errorHandler(404, 'Invalid credentials')

      req.session.userId = user.id

      const transformedUser = new UserDto(user)
      return {
        code: 200,
        success: true,
        message: 'Login successful',
        user: transformedUser,
      }
    },

    logout: (_: any, __: any, { req, res }: MyContext): Promise<boolean> => {
      return new Promise((resolve) => {
        req.session.destroy((err) => {
          res.clearCookie(SESSION_COOKIE_NAME)
          if (err) {
            console.log(err)
            resolve(false)
            return
          }
          resolve(true)
        })
      })
    },
  },
}
export default resolvers
