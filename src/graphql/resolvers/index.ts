import merge from 'lodash.merge'

import userResolvers from './user.resolvers'
import docResolvers from './doc.resolvers'

const resolvers = merge({}, userResolvers, docResolvers)

export default resolvers
