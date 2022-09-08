import { HttpBaseResponse } from '../contracts/http-base-response'

export class HttpResponse {
	public static ok(data: any): HttpBaseResponse {
		return new HttpBaseResponse({ status: 200, data })
	}

	public static created(data: any): HttpBaseResponse {
		return new HttpBaseResponse({ status: 201, data })
	}

	public static badRequest(error: Error): HttpBaseResponse {
		return new HttpBaseResponse({ status: 400, message: error.message, error })
	}

	public static methodNotAllowed(): HttpBaseResponse {
		return new HttpBaseResponse({ status: 405 })
	}

	public static serverError(): HttpBaseResponse {
		return new HttpBaseResponse({ status: 500, message: 'Unexpected error' })
	}
}
