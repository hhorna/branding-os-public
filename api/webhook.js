export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    
    await fetch('https://hook.us2.make.com/qdty22lm7qa7tftxjdak6gyqlvoj8nxe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });
    res.status(200).json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
