import { ChainHandler } from '../domain/contracts/chain-handler'
import { Controller } from '../domain/contracts/controller'
import { RegisterDto } from '../domain/dtos/register-dto'
import { RegisterUseCase } from '../domain/use-cases/register-use-case'

export class RegisterController implements Controller<RegisterDto, { token: string }> {
	constructor(
		private readonly validator: ChainHandler<RegisterDto>,
		private readonly registerUseCase: RegisterUseCase
	) {}

	public async handle(registerDto: RegisterDto): Promise<{ token: string }> {
		this.validator.handle(registerDto)
		const token = await this.registerUseCase.register(registerDto)
		return { token }
	}
}
