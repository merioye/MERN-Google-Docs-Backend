import { Pool } from 'pg'

import { DB_CONN_TIMEOUT, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './constants'

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionTimeoutMillis: DB_CONN_TIMEOUT,
})
