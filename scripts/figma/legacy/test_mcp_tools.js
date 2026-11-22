const https = require('https');

const MCP_URL = 'https://mcp.figma.com/mcp';
const TOKEN = process.env.FIGMA_TOKEN || '';

// Try to access MCP tools via POST
const postData = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list'
});

const options = {
  hostname: 'mcp.figma.com',
  path: '/mcp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 10000
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.on('timeout', () => {
  console.log('Request timed out');
  req.destroy();
});

req.write(postData);
req.end();
