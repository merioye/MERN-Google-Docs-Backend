import { GraphQLError } from 'graphql'

import docService from '../../services/doc.service'
import {
  Doc,
  DocMutationResponse,
  DocsQueryResponse,
  DocQueryResponse,
} from '../../types/doc.types'
import { MyContext } from '../../types/shared.types'

const resolvers = {
  Query: {
    getMyDocs: async (_: any, __: any, { req }: MyContext): Promise<DocsQueryResponse> => {
      const userId = req.session?.userId
      if (!userId) throw new GraphQLError('User is not authenticated')

      const docs = await docService.getDocumentsByUserId(userId as string)
      return {
        code: 201,
        success: true,
        message: 'Successful',
        docs: docs as Doc[],
      }
    },
    getSingleDoc: async (
      _: any,
      { docId }: { docId: string },
      { req }: MyContext,
    ): Promise<DocQueryResponse> => {
      const userId = req.session?.userId
      if (!userId) throw new GraphQLError('User is not authenticated')

      const doc = await docService.getDocumentById(userId as string, docId)
      return {
        code: 201,
        success: doc ? true : false,
        message: doc ? 'Successful' : 'Unsuccessful',
        doc: doc,
      }
    },
  },
  Mutation: {
    createDoc: async (
      _: any,
      { title }: { title: string },
      { req }: MyContext,
    ): Promise<DocMutationResponse> => {
      const userId = req.session?.userId
      if (!userId) throw new GraphQLError('User is not authenticated')

      const doc: Doc = await docService.createDocument(userId as string, title)
      return {
        code: 201,
        success: true,
        message: 'Document created successfully',
        doc: doc,
      }
    },
    updateDoc: async (
      _: any,
      { docId, editorstate }: { docId: string; editorstate: string },
      { req }: MyContext,
    ): Promise<DocMutationResponse> => {
      const userId = req.session?.userId
      if (!userId) throw new GraphQLError('User is not authenticated')

      const updatedDoc: Doc = await docService.updateDocument(userId as string, docId, editorstate)
      return {
        code: 200,
        success: updatedDoc ? true : false,
        message: updatedDoc
          ? 'Document updated successfully'
          : 'You are not allowed to update this document',
        doc: updatedDoc,
      }
    },
    deleteDoc: async (
      _: any,
      { docId }: { docId: string },
      { req }: MyContext,
    ): Promise<DocMutationResponse> => {
      const userId = req.session?.userId
      if (!userId) throw new GraphQLError('User is not authenticated')

      const deletedDoc: Doc = await docService.deleteDocument(userId as string, docId)
      return {
        code: 200,
        success: deletedDoc ? true : false,
        message: deletedDoc
          ? 'Document deleted successfully'
          : 'You are not allowed to delete this document',
        doc: deletedDoc,
      }
    },
  },
}

export default resolvers
