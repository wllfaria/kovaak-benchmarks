import { NextApiRequest, NextApiResponse } from 'next'
import { RegisterFactory } from '../../../main/register-factory'
import { InvalidParamError, MissingParamError } from '../../../utils/errors'

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const methodHandler: { [key: string]: () => Promise<void> } = {
		post: async () => {
			try {
				const { registerController } = RegisterFactory.make()
				const token = await registerController.handle(req.body)
				res.status(200).json(token)
			} catch (err) {
				if (err instanceof MissingParamError) res.status(400).json({ message: err.message })
				if (err instanceof InvalidParamError) res.status(400).json({ message: err.message })
			}
		},
	}

	await methodHandler[req.method?.toLowerCase() as string]()
}
