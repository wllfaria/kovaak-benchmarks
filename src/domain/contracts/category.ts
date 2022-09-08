import { IExercise } from './exercise'

export interface ICategory {
	_id: string
	name: string
	exercises: IExercise[]
	createdAt: string
	updatedAt: string
}
