const fs = require('fs');
const path = require('path');

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copy(path.join(src, name), path.join(dest, name));
    }
  } else {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const apiDist = path.join(root, 'api', '_dist');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(dist)) {
  console.error('Error: dist directory not found. Run `npm run build` first.');
  process.exit(1);
}

copy(dist, apiDist);
// copy client static to public so Vercel serves it as static assets
const clientDir = path.join(dist, 'client');
if (fs.existsSync(clientDir)) {
  copy(clientDir, publicDir);
}

console.log('Copied dist -> api/_dist and dist/client -> public (if present)');
