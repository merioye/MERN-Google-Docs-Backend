const typeDefs = `#graphql
interface Response{
  code: Int!
  success: Boolean!
  message: String!
}
type User {
  id: ID!
  name: String!
  email: String!
  profile: String!
}
type UserQueryResponse implements Response{
  code: Int!
  success: Boolean!
  message: String!
  user: User
}
type AuthMutationResponse implements Response{
  code: Int!
  success: Boolean!
  message: String!
  user: User
}
type Query {
  sayHello: String!
  whoAmI: UserQueryResponse
}
type Mutation {
  register(name:String!, email: String!, password: String!, profile: String!): AuthMutationResponse
  login(email:String!, password:String!): AuthMutationResponse
  logout: Boolean!
}
`

export default typeDefs
