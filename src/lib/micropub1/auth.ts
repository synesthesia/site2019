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

import { Context } from 'aws-lambda'
import fetch from 'node-fetch';

export async function checkAuth(headers,  context: Context) {
  if (headers['x-auth']) {
    console.debug("Looking for secret key")  
    if (headers.authorization !== `Bearer ${process.env.MICROPUB_KEY}`) {
      throw new Error(`Secret mismatch. Got: ${headers.authorization?.slice(0, 4)}`);
    }
    return;
  }

  console.debug("Checking token endpoint")
  const res = await fetch('https://tokens.indieauth.com/token', {
    headers: {
      accept: 'application/json',
      authorization: headers.authorization
    }
  });

  if (!res.ok) {
      console.log(`Unexpected response: ${await res.text()}`);
      throw new Error(`Unexpected status: ${res.status}`);
  }
  
  const body : any = await res.json() ;
  console.log(body)
  if (body.me !== 'https://www.synesthesia.co.uk/') {
    throw new Error('Not authorized.');
  }
  if (!(body.scope.includes('create') || body.scope.includes('post'))) {
      throw new Error('Not an acceptable scope.');
  }
  console.log('Authorized');
}
