import { ChainHandler } from '../contracts/chain-handler'
import { IUser } from '../contracts/user'
import { UserRepository } from '../contracts/user-repository'
import { RegisterDto } from '../dtos/register-dto'

export class RegisterUseCase {
	constructor(private readonly validator: ChainHandler<RegisterDto>, private readonly userRepository: UserRepository) {}

	public async register(registerDto: RegisterDto): Promise<IUser> {
		this.validator.handle(registerDto)
		const user = await this.userRepository.insert(registerDto)
		return user
	}
}
