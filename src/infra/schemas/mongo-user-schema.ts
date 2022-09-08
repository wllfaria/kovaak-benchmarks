import { model, Schema } from 'mongoose'
import { IUser } from '../../domain/contracts/user'

export const MongoUserSchema = new Schema<IUser>(
	{
		username: { type: 'string', required: true },
		password: { type: 'string', required: true },
		email: { type: 'string', required: true, unique: true },
	},
	{ timestamps: true }
)

export const MongoUserModel = model<IUser>('user', MongoUserSchema)
