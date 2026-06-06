const path = require('path');

// Path to the prebuilt server bundle copied into api/_dist during vercel-build
const serverPath = path.join(__dirname, '_dist', 'server', 'server.js');

module.exports = async (req, res) => {
  try {
    // Use dynamic import to ensure the built bundle is loaded
    const mod = await import(serverPath);
    const server = mod.default ?? mod;

    // Construct a WHATWG Request from Node's req (simple transport)
    const url = `${req.protocol || 'https'}://${req.headers.host}${req.url}`;
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers || {})) {
      if (v != null) headers.set(k, Array.isArray(v) ? v.join(',') : v);
    }

    const body = req.method === 'GET' || req.method === 'HEAD' ? null : req;
    const request = new Request(url, { method: req.method, headers, body });

    const response = await server.fetch(request, undefined, undefined);

    // Pipe response back to Node res
    res.statusCode = response.status;
    response.headers.forEach((value, name) => res.setHeader(name, value));

    const reader = response.body ? response.body.getReader() : null;
    if (!reader) return res.end();

    const stream = new WritableStream({
      write(chunk) {
        res.write(Buffer.from(chunk));
      },
      close() {
        res.end();
      },
      abort(err) {
        res.destroy(err);
      },
    });

    await response.body.pipeTo(stream);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};
