/*
 *  Copyright Julian Elve
 *
 *  All code additions and modifications made by Julian Elve are copyright (c) 2021-2022 Julian Elve
 *
 *  **MIT licence**
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { checkAuth } from '../lib/micropub1/auth'

interface MicroPubResponse {
  statusCode: number
  headers?: any
  body: string
}

const handler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const params = event.queryStringParameters

  console.log('GOT REQUEST:', { ...event.headers, authorization: 'XXXXX' });

  try {
    await checkAuth(event.headers, context);
  } catch (e) {
    console.error(e.stack);
    return { statusCode: 401, body: 'Not authorized.' };
  }

  /*
  const response: MicroPubResponse = {
    statusCode: 400,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      error: "invalid_request",
      error_description : "Here is the description",
    }),
  }
 */
  const location = "/"
  const response: MicroPubResponse = {
    statusCode: 202,
    headers: {
        Location: location
    },
    body: JSON.stringify({
      msg: `Hello world ${Math.floor(Math.random() * 10)}`,
      params,
    }),
  }


  callback(undefined, response)
}

export { handler }
