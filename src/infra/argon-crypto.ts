import { Crypto } from '../domain/contracts/crypto'
import argon2 from 'argon2'
import { CryptoError } from '../utils/errors'

export class ArgonCrypto implements Crypto {
	public async hash(rawString: string): Promise<string> {
		return await argon2.hash(rawString)
	}

	public async compare(rawString: string, hashedString: string): Promise<void> {
		const isStringValid = await argon2.verify(hashedString, rawString)
		if (!isStringValid) throw new CryptoError('Passwords do not match')
	}
}
