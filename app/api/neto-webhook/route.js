export async function POST(request) {
    const headers = Object.fromEntries(request.headers.entries());
    const bodyText = await request.text(); // raw body in case Neto sends non-JSON
  
    console.log('📦 Headers received:');
    console.log(headers);
  
    console.log('\n📨 Raw body received:');
    console.log(bodyText);
  
    // Try to parse JSON if possible
    let parsedBody;
    try {
      parsedBody = JSON.parse(bodyText);
      console.log('\n✅ Parsed JSON body:');
      console.log(parsedBody);
    } catch {
      console.warn('⚠️ Could not parse JSON body.');
    }
  
    // Simple verification example
    const netoApiKey = headers['netoapi_key'];
    if (netoApiKey) {
      console.log(`✅ Neto API Key received: ${netoApiKey}`);
    } else {
      console.warn('❌ Neto API Key missing!');
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
  