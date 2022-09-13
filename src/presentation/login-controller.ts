import { ChainHandler } from '../domain/contracts/chain-handler'
import { Controller } from '../domain/contracts/controller'
import { LoginDto } from '../domain/dtos/login-dto'
import { LoginUseCase } from '../domain/use-cases/login-use-case'

export class LoginController implements Controller<LoginDto, { token: string }> {
	constructor(private readonly validator: ChainHandler<LoginDto>, private readonly loginUseCase: LoginUseCase) {}

	public async handle(loginDto: LoginDto): Promise<{ token: string }> {
		this.validator.handle(loginDto)
		const token = await this.loginUseCase.login(loginDto)
		return { token }
	}
}
