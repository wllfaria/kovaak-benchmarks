import { ITier } from './tier'

export interface IExercise {
	_id: string
	tiers: ITier[]
	createdAt: string
	updatedAt: string
}
