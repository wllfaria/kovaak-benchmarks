export class MathUtils {
	public calculateHarmonicMean(values: number[]): number {
		const n = values.length
		const sum = values.reduce((sum, value) => {
			if (value <= 0) return NaN
			sum += 1 / value
			return sum
		}, 0)
		return n / sum
	}
}
