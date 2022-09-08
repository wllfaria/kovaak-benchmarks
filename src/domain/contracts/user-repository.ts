import { IUser } from '../contracts/user'
import { RegisterDto } from '../dtos/register-dto'

export interface UserRepository {
	findOneByUsername: (username: string) => Promise<IUser | null | undefined>
	insert: (userData: RegisterDto) => Promise<IUser>
}
