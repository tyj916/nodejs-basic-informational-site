const http = require('http');
const fs = require('fs');
const url = require('url');

const page404 = fs.readFileSync('404.html', (err, data) => {
  if (err) throw err;
  return data;
});

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname === '/' ? 'index.html' : '.' + q.pathname + '.html';
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(page404);
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);