import { ChainHandler } from '../contracts/chain-handler'

export abstract class AbstractChainHandler<T> implements ChainHandler<T> {
	nextHandler: ChainHandler<T> | undefined

	public setNext(chainHandler: ChainHandler<T>): ChainHandler<T> {
		this.nextHandler = chainHandler
		return chainHandler
	}

	public handle(request: T): void {
		if (this.nextHandler != null) return this.nextHandler.handle(request)
	}
}
