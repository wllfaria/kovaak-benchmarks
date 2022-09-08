import { Schema } from 'mongoose'
import { ITier } from '../../domain/contracts/tier'

export const MongoTierSchema = new Schema<ITier>(
	{
		name: { type: 'string', required: true },
		score: { type: 'number', required: true },
	},
	{ timestamps: true }
)
