import { parseStringPromise } from 'xml2js';

export async function POST(request) {
  const headers = Object.fromEntries(request.headers.entries());
  const bodyText = await request.text(); // raw XML

  console.log('📦 Headers received:');
  console.log(headers);

  console.log('\n📨 Raw XML received:');
  console.log(bodyText);

  let parsedXml;
  try {
    parsedXml = await parseStringPromise(bodyText, { explicitArray: false });
    console.log('\n✅ Parsed XML:');
    console.dir(parsedXml, { depth: null });
  } catch (err) {
    console.error('❌ Failed to parse XML:', err.message);
  }

  return new Response(JSON.stringify({ status: 'Webhook received' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function GET() {
  return new Response(
    JSON.stringify({ message: 'Neto webhook endpoint is live' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
