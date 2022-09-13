import { MongoDatabase } from '../../infra/mongo-database'
import { ChainHandler } from '../contracts/chain-handler'
import { Crypto } from '../contracts/crypto'
import { Token } from '../contracts/token'
import { UserRepository } from '../contracts/user-repository'
import { LoginDto } from '../dtos/login-dto'

export class LoginUseCase {
	constructor(
		private readonly validator: ChainHandler<LoginDto>,
		private readonly userRepository: UserRepository,
		private readonly token: Token,
		private readonly crypto: Crypto
	) {}

	public async login(loginDto: LoginDto): Promise<string> {
		this.validator.handle(loginDto)
		await MongoDatabase.getInstance().connect()
		const user = await this.userRepository.findOneByUsername(loginDto.username)
		if (user == null) throw new Error()
		await this.crypto.compare(loginDto.password, user.password)
		const token = this.token.sign({ _id: user._id })
		return token
	}
}
