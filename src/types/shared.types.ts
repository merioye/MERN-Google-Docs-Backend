import { Request, Response as Res } from 'express'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Session {
      userId?: string
    }
  }
}
// Api Response type
export interface Response {
  code: number
  success: boolean
  message: string
}

export type Req = Request & { session: Express.Session }
export interface MyContext {
  req: Req
  res: Res
}
