export interface Controller<A, T> {
	handle: (payload: A) => Promise<T>
}
