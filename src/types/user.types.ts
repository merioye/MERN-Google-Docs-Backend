import { Response } from './shared.types'

export interface RegisterArgs {
  name: string
  email: string
  password: string
  profile: string
}
export interface LoginArgs {
  email: string
  password: string
}
export interface User {
  id: string
  name: string
  email: string
  profile: string
}
export interface UserQueryResponse extends Response {
  user: User
}
export interface AuthMutationResponse extends Response {
  user: User
}
