import { Schema } from 'mongoose'
import { ICategory } from '../../domain/contracts/category'
import { MongoExerciseSchema } from './mongo-exercise-schema'

export const MongoCategorySchema = new Schema<ICategory>(
	{
		name: { type: 'string', required: true },
		exercises: [MongoExerciseSchema],
	},
	{ timestamps: true }
)
