const Webmention = require('./lib/webmention');
const sendMention = require('./lib/send');

export async function handler(event, context) {
  console.log('deploy-succeeded');
  console.log('event', event);
  console.log('context', context);
  console.log('branch', process.env.BRANCH);
  console.log('url', process.env.URL);
  console.log('site-context', process.env.CONTEXT);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello world` })
  };
}
