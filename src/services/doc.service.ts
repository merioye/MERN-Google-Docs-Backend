import { GraphQLError } from 'graphql'

import { pool } from '../config/db'

class DocService {
  createDocument = async (userId: string, title: string) => {
    try {
      const query = 'INSERT INTO docs(userId,title) VALUES($1,$2) RETURNING *'
      const result = await pool.query(query, [userId, title])
      return result.rows[0]
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }

  getDocumentsByUserId = async (userId: string) => {
    try {
      const query = 'SELECT * FROM docs WHERE userid=$1 ORDER BY createdat desc'
      const result = await pool.query(query, [userId])
      return result.rows
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }

  getDocumentById = async (userId: string, docId: string) => {
    try {
      const query = 'SELECT * FROM docs WHERE id=$1 AND userid=$2'
      const result = await pool.query(query, [docId, userId])
      return result.rows[0]
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }

  updateDocument = async (userId: string, docId: string, editorstate: string) => {
    try {
      const query = 'UPDATE docs SET editorstate=$1 WHERE id=$2 AND userid=$3 RETURNING *'
      const result = await pool.query(query, [editorstate, docId, userId])
      return result.rows[0]
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }

  deleteDocument = async (userId: string, docId: string) => {
    try {
      const query = 'DELETE FROM docs WHERE id=$1 AND userid=$2 RETURNING *'
      const result = await pool.query(query, [docId, userId])
      return result.rows[0]
    } catch (_) {
      throw new GraphQLError('Oops! something went wrong')
    }
  }
}

export default new DocService()
