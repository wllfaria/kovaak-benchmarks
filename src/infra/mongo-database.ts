import mongoose from 'mongoose'
import { DATABASE_URI } from '../utils/constants'

export class MongoDatabase {
	private static instance: MongoDatabase
	public connection: typeof mongoose | null = null

	public static getInstance(): MongoDatabase {
		if (MongoDatabase.instance == null) MongoDatabase.instance = new MongoDatabase()
		return MongoDatabase.instance
	}

	public async connect(): Promise<void> {
		if (this.connection !== null) return
		this.connection = await mongoose.connect(DATABASE_URI)
	}
}
