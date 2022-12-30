import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { json } from 'body-parser'
import session from 'express-session'
import pgConnect from 'connect-pg-simple'

const pgSession = pgConnect(session)

import {
  API_BASE_URL,
  CLIENT_BASE_URL,
  NODE_ENV,
  PORT,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_SECRET,
  SESSION_PRUNE_INTERVAL,
} from './config/constants'
import { pool } from './config/db'
import { MyContext } from './types/shared.types'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()

  const pgStore = new pgSession({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
    disableTouch: true,
    pruneSessionInterval: SESSION_PRUNE_INTERVAL,
  })
  const corsOptions = {
    origin: CLIENT_BASE_URL,
    credentials: true,
  }
  const sessionOptions = {
    store: pgStore,
    name: SESSION_COOKIE_NAME,
    secret: SESSION_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: SESSION_COOKIE_MAX_AGE,
    },
  }
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    session(sessionOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at ${API_BASE_URL}/graphql`)
}

startServer()
