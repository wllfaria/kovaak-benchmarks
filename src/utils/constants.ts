import jwt from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM as jwt.Algorithm
export const JWT_EXPIRE_TIMESTAMP = process.env.JWT_EXPIRE_TIMESTAMP as string | number
