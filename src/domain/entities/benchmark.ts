import { ICategory } from './category'
import { ITier } from './tier'

export interface IBenchmark {
	_id: string
	categories: ICategory[]
	tiers: ITier[]
	name: string
	playlistShareCode: string
	createdAt: string
	updatedAt: string
}
