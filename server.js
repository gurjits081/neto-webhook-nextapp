import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON payloads
app.use(express.json());

// Webhook endpoint
app.post('/neto-webhook', (req, res) => {
  console.log('📦 Headers received:');
  console.log(req.headers); // Logs all headers Neto sends

  console.log('\n📨 Body received:');
  console.log(JSON.stringify(req.body, null, 2)); // Pretty-print JSON payload

  // Simple API key check
  const netoApiKey = req.headers['netoapi_key'];
  if (netoApiKey) {
    console.log(`✅ Neto API Key received: ${netoApiKey}`);
  } else {
    console.warn('❌ Neto API Key missing!');
  }

  // Respond quickly so Neto doesn't retry
  res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
  console.log(`🚀 Neto webhook test server running at http://localhost:${PORT}`);
});
