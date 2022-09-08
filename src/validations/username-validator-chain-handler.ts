import { AbstractChainHandler } from '../domain/entities/abstract-chain-handler'
import { InvalidParamError, MissingParamError } from '../utils/errors'

export class UsernameValidatorChainHandler<T> extends AbstractChainHandler<T> {
	public handle(request: T & { username: string }): void {
		if (request.username === null) throw new MissingParamError('username')
		if (request.username.length < 3) throw new InvalidParamError('username must be at least 3 characters long')
		if (request.username.length > 24) throw new InvalidParamError('username must be at most 24 characters long')
		return super.handle(request)
	}
}
