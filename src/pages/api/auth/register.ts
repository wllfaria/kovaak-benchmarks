import { NextApiRequest, NextApiResponse } from 'next'
import { RegisterFactory } from '../../../main/register-factory'
import { HttpResponse } from '../../../presentation/helpers/http-response'
import { NextErrorHandler } from '../../../infra/next-error-handler'

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<any> {
	switch (req.method) {
		case 'POST':
			try {
				const { registerController } = RegisterFactory.make()
				const token = await registerController.handle(req.body)
				const response = HttpResponse.created(token)
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
