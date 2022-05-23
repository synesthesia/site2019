
import got from 'got'

import { Error } from './response'

const Auth = {
	validateToken: async (tokenEndpoint, token) => {
		try {
			const { body } = await got(tokenEndpoint, {
				headers: {
					'accept': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				responseType: 'json'
			})
			return body
		} catch (err) {
			console.error(err)
		}
	},
	isValidScope: (scope, requiredScopes) => {
		const validScopes = scope.split(' ')
		// Checks if at least one of the values in `requiredScopes` is in `validScopes`
		return requiredScopes.split(' ').some(sc => validScopes.includes(sc))
	},
	getToken: (headers, body) => {
		if (headers && headers.authorization && headers.authorization.split(' ')[1] && body && body['access_token']) {
			return Error.INVALID
		}
		const token = (headers && headers.authorization && headers.authorization.split(' ')[1]) || (body && body['access_token'])
		return token || Error.UNAUTHORIZED
	},
	isAuthorized: async (headers, body) => {
		console.log('HEADERS:', headers)
		console.log('BODY:', JSON.stringify(body))

    if (headers['x-auth']) {
      console.debug("Authorising with key")
      if (headers.authorization !== `Bearer ${process.env.MICROPUB_KEY}`) {
        return Error.INVALID
      }
      return "create";
    }

    const token = Auth.getToken(headers, body)
		if (!token || token.error) {
			return token || Error.UNAUTHORIZED
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const auth = await Auth.validateToken(process.env.TOKEN_ENDPOINT, token) as any
		if (!auth || auth.me != process.env.ME) {
			return Error.FORBIDDEN
		}
		return auth.scope
	}
}

export default Auth
