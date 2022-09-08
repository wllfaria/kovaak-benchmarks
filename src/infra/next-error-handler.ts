import { NextApiResponse } from 'next'
import { HttpBaseResponse } from '../presentation/contracts/http-base-response'
import { HttpResponse } from '../presentation/helpers/http-response'
import { InvalidParamError, MissingParamError } from '../utils/errors'

export class NextErrorHandler {
	public static handle(err: unknown, res: NextApiResponse): void {
		let response: HttpBaseResponse
		if (err instanceof MissingParamError) response = HttpResponse.badRequest(err)
		if (err instanceof InvalidParamError) response = HttpResponse.badRequest(err)
		else response = HttpResponse.serverError()
		res.status(response.status).json(response)
	}
}
