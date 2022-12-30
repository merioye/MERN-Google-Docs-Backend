import { GraphQLError } from 'graphql'

// const errors = {
//   '401': '',
//   '403': '',
//   '404': '',
//   '409': '',
//   '500': '',
// }
export const errorHandler = (code: number, message?: string) => {
  throw new GraphQLError(message ? message : 'Interval Server Error', {
    extensions: {
      http: {
        status: code,
      },
    },
  })
}
