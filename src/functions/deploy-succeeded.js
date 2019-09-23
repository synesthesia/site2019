export async function handler(event, context) {
  console.log(event.site);
  console.log(event.payload);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello world` })
  };
}
