import { Model } from 'mongoose'
import { IUser } from '../../domain/contracts/user'
import { UserRepository } from '../../domain/contracts/user-repository'
import { RegisterDto } from '../../domain/dtos/register-dto'

export class MongoUserRepository implements UserRepository {
	constructor(private readonly userModel: Model<IUser>) {}

	public async findOneByUsername(username: string): Promise<IUser | null | undefined> {
		const user = await this.userModel.findOne({ username })
		return user
	}

	public async insert(userData: RegisterDto): Promise<IUser> {
		const user = await this.userModel.create(userData)
		return user
	}
}
