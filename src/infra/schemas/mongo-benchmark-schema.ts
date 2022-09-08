import { Schema } from 'mongoose'
import { IBenchmark } from '../../domain/contracts/benchmark'
import { MongoCategorySchema } from './mongo-category-schema'
import { MongoTierSchema } from './mongo-tier-schema'

export const MongoBenchmarkSchema = new Schema<IBenchmark>(
	{
		categories: [MongoCategorySchema],
		tiers: [MongoTierSchema],
		name: { type: 'string', required: true },
		playlistShareCode: { type: 'string', required: true },
	},
	{ timestamps: true }
)
