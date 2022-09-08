import { MongoDatabase } from '../../infra/mongo-database'
import { ChainHandler } from '../contracts/chain-handler'
import { Crypto } from '../contracts/crypto'
import { Token } from '../contracts/token'
import { UserRepository } from '../contracts/user-repository'
import { RegisterDto } from '../dtos/register-dto'

export class RegisterUseCase {
	constructor(
		private readonly validator: ChainHandler<RegisterDto>,
		private readonly userRepository: UserRepository,
		private readonly token: Token,
		private readonly crypto: Crypto
	) {}

	public async register(registerDto: RegisterDto): Promise<string> {
		this.validator.handle(registerDto)
		await MongoDatabase.getInstance().connect()
		const hashedPassword = await this.crypto.hash(registerDto.password)
		registerDto.password = hashedPassword
		const user = await this.userRepository.insert(registerDto)
		const token = this.token.sign({ _id: user._id })
		return token
	}
}
