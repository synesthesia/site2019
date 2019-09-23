export async function handler(event, context) {
  console.log('deploy-succeeded')
  console.log('event', event)
  console.log('context', context)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello world` })
  };
}
