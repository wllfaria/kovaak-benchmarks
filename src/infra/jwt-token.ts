import { Token } from '../domain/contracts/token'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_TIMESTAMP } from '../utils/constants'

export class JWTToken implements Token {
	public sign(payload: any): string {
		return jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRE_TIMESTAMP })
	}
}
