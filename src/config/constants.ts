import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 8000
export const API_BASE_URL = process.env.API_BASE_URL
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL
export const HASH_SALT_ROUNDS = Number(process.env.HASH_SALT_ROUNDS) || 10
export const SESSION_COOKIE_NAME = String(process.env.SESSION_COOKIE_NAME)
export const SESSION_COOKIE_SECRET = String(process.env.SESSION_COOKIE_SECRET)
export const SESSION_COOKIE_MAX_AGE = Number(process.env.SESSION_COOKIE_MAX_AGE)
export const SESSION_PRUNE_INTERVAL = Number(process.env.SESSION_PRUNE_INTERVAL)
export const DB_USER = process.env.DB_USER
export const DB_PASS = process.env.DB_PASS
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = Number(process.env.DB_PORT) || 5432
export const DB_CONN_TIMEOUT = Number(process.env.DB_CONN_TIMEOUT) || 2000
