import { AbstractChainHandler } from '../domain/entities/abstract-chain-handler'
import { InvalidParamError, MissingParamError } from '../utils/errors'

export class EmailValidatorChainHandler<T> extends AbstractChainHandler<T> {
	public handle(request: T & { email: string }): void {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (request.email == null) throw new MissingParamError('email')
		if (!emailRegex.test(request.email)) throw new InvalidParamError('email must be a valid email')
		super.handle(request)
	}
}
