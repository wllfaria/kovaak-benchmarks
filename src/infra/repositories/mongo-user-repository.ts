import { Model } from 'mongoose'
import { IUser } from '../../domain/contracts/user'
import { UserRepository } from '../../domain/contracts/user-repository'
import { RegisterDto } from '../../domain/dtos/register-dto'
import { InvalidParamError } from '../../utils/errors'

export class MongoUserRepository implements UserRepository {
	constructor(private readonly userModel: Model<IUser>) {}

	public async findOneByUsername(username: string): Promise<IUser | null> {
		return await this.userModel.findOne({ username })
	}

	private async findOneByEmail(email: string): Promise<IUser | null> {
		return await this.userModel.findOne({ email })
	}

	private async verifyIfUserExists({ email, username }: RegisterDto): Promise<void> {
		const userWithSameUsername = await this.findOneByUsername(username)
		const userWithSameEmail = await this.findOneByEmail(email)
		if (userWithSameUsername !== null) throw new InvalidParamError('user with provided username already exists')
		if (userWithSameEmail !== null) throw new InvalidParamError('user with provided email already exists')
	}

	public async insert(userData: RegisterDto): Promise<IUser> {
		await this.verifyIfUserExists(userData)
		const user = await this.userModel.create(userData)
		return user
	}
}
