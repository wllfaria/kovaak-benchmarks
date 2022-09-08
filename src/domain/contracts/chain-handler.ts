export interface ChainHandler<T> {
	setNext: (handler: ChainHandler<T>) => ChainHandler<T>
	handle: (request: T) => any
}
