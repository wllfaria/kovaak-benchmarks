import { Schema } from 'mongoose'
import { IExercise } from '../../domain/contracts/exercise'
import { MongoTierSchema } from './mongo-tier-schema'

export const MongoExerciseSchema = new Schema<IExercise>(
	{
		tiers: [MongoTierSchema],
	},
	{ timestamps: true }
)
