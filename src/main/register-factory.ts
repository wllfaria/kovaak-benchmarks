import { Model } from 'mongoose'
import { ChainHandler } from '../domain/contracts/chain-handler'
import { Controller } from '../domain/contracts/controller'
import { Crypto } from '../domain/contracts/crypto'
import { Token } from '../domain/contracts/token'
import { IUser } from '../domain/contracts/user'
import { UserRepository } from '../domain/contracts/user-repository'
import { RegisterDto } from '../domain/dtos/register-dto'
import { RegisterUseCase } from '../domain/use-cases/register-use-case'
import { ArgonCrypto } from '../infra/argon-crypto'
import { JWTToken } from '../infra/jwt-token'
import { MongoUserRepository } from '../infra/repositories/mongo-user-repository'
import { MongoUserModel } from '../infra/schemas/mongo-user-schema'
import { RegisterController } from '../presentation/register-controller'
import {
	EmailValidatorChainHandler,
	PasswordValidatorChainHandler,
	UsernameValidatorChainHandler,
} from '../validations'

export class RegisterFactory {
	public static make(): { registerController: Controller<RegisterDto, string> } {
		const validator = RegisterFactory.makeValidator()
		const model = RegisterFactory.makeModel()
		const repository = RegisterFactory.makeRepository(model)
		const token = RegisterFactory.makeToken()
		const crypto = RegisterFactory.makeCrypto()
		const useCase = RegisterFactory.makeUseCase(validator, repository, token, crypto)
		const registerController = RegisterFactory.makeRegisterController(validator, useCase)
		return { registerController }
	}

	private static makeRegisterController(
		validator: ChainHandler<RegisterDto>,
		useCase: RegisterUseCase
	): Controller<RegisterDto, string> {
		return new RegisterController(validator, useCase)
	}

	private static makeValidator(): ChainHandler<RegisterDto> {
		const usernameValidator = new UsernameValidatorChainHandler<RegisterDto>()
		const passwordValidator = new PasswordValidatorChainHandler<RegisterDto>()
		const emailValidator = new EmailValidatorChainHandler<RegisterDto>()
		usernameValidator.setNext(passwordValidator).setNext(emailValidator)
		return usernameValidator
	}

	private static makeUseCase(
		validator: ChainHandler<RegisterDto>,
		repository: UserRepository,
		token: Token,
		crypto: Crypto
	): RegisterUseCase {
		return new RegisterUseCase(validator, repository, token, crypto)
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
