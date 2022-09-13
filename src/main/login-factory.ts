import { Model } from 'mongoose'
import { ChainHandler } from '../domain/contracts/chain-handler'
import { Controller } from '../domain/contracts/controller'
import { Crypto } from '../domain/contracts/crypto'
import { Token } from '../domain/contracts/token'
import { IUser } from '../domain/contracts/user'
import { UserRepository } from '../domain/contracts/user-repository'
import { LoginDto } from '../domain/dtos/login-dto'
import { LoginUseCase } from '../domain/use-cases/login-use-case'
import { ArgonCrypto } from '../infra/argon-crypto'
import { JWTToken } from '../infra/jwt-token'
import { MongoUserRepository } from '../infra/repositories/mongo-user-repository'
import { MongoUserModel } from '../infra/schemas/mongo-user-schema'
import { LoginController } from '../presentation/login-controller'
import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from '../validations'

export class LoginFactory {
	public static make(): { loginController: Controller<LoginDto, { token: string }> } {
		const validator = LoginFactory.makeValidator()
		const model = LoginFactory.makeModel()
		const repository = LoginFactory.makeRepository(model)
		const token = LoginFactory.makeToken()
		const crypto = LoginFactory.makeCrypto()
		const useCase = LoginFactory.makeUseCase(validator, repository, token, crypto)
		const loginController = LoginFactory.makeLoginController(validator, useCase)
		return { loginController }
	}

	private static makeLoginController(
		validator: ChainHandler<LoginDto>,
		useCase: LoginUseCase
	): Controller<LoginDto, { token: string }> {
		return new LoginController(validator, useCase)
	}

	private static makeValidator(): ChainHandler<LoginDto> {
		const usernameValidator = new UsernameValidatorChainHandler<LoginDto>()
		const passwordValidator = new PasswordValidatorChainHandler<LoginDto>()
		usernameValidator.setNext(passwordValidator)
		return usernameValidator
	}

	private static makeUseCase(
		validator: ChainHandler<LoginDto>,
		repository: UserRepository,
		token: Token,
		crypto: Crypto
	): LoginUseCase {
		return new LoginUseCase(validator, repository, token, crypto)
	}

	private static makeToken(): Token {
		return new JWTToken()
	}

	private static makeCrypto(): Crypto {
		return new ArgonCrypto()
	}

	private static makeRepository(model: Model<IUser>): UserRepository {
		return new MongoUserRepository(model)
	}

	private static makeModel(): Model<IUser> {
		return MongoUserModel
	}
}
