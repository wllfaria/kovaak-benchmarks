import { NextApiRequest, NextApiResponse } from 'next'
import { NextErrorHandler } from '../../../infra/next-error-handler'
import { LoginFactory } from '../../../main/login-factory'
import { HttpResponse } from '../../../presentation/helpers/http-response'

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	switch (req.method) {
		case 'POST':
			try {
				const { loginController } = LoginFactory.make()
				const token = await loginController.handle(req.body)
				const response = HttpResponse.ok(token)
				return res.status(response.status).json(response)
			} catch (err) {
				return NextErrorHandler.handle(err, res)
			}
		default: {
			res.setHeader('Allow', ['POST'])
			const response = HttpResponse.methodNotAllowed()
			return res.status(response.status).end()
		}
	}
}
