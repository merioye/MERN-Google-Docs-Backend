import merge from 'lodash.merge'

import userResolvers from './user.resolvers'

const resolvers = merge({}, userResolvers)

export default resolvers
