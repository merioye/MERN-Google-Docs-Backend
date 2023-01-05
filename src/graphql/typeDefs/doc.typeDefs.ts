const typeDefs = `#graphql
interface Response{
  code: Int!
  success: Boolean!
  message: String!
}
type Doc{
    id: ID!
    userid: String!
    title: String!
    editorstate:String!
    createdat: String!
}
type DocsQueryResponse implements Response{
  code: Int! 
  success: Boolean!
  message: String!
  docs: [Doc]
}
type DocResponse implements Response{
  code: Int!
  success: Boolean!
  message: String!
  doc: Doc
}
type Query{
  getMyDocs: DocsQueryResponse
  getSingleDoc(docId:String!): DocResponse
}
type Mutation{
  createDoc(title:String!): DocResponse
  updateDoc(docId:String!, editorstate:String!): DocResponse
  deleteDoc(docId:String!): DocResponse
}
`

export default typeDefs
