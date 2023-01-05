import { Response } from './shared.types'

export interface Doc {
  id: string
  userid: string
  title: string
  editorstate: string
  createdat: string
}
export interface DocsQueryResponse extends Response {
  docs: Doc[]
}
export interface DocQueryResponse extends Response {
  doc: Doc
}
export interface DocMutationResponse extends Response {
  doc: Doc
}
