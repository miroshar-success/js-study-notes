const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    const data = fs.readFileSync('./index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
      'Cache-Control': 'max-age=200000, no-cache',
      'Last-Modified': new Date().toLocaleDateString(),
      'Etag': '123455'
    })
    res.end(data)
  }
  if (req.url === '/script.js') {
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'max-age=8, no-store',
      'Etag': '123',
      'Set-Cookie': 'name=kyrie'
      // 'Last-Modified': (new Date()).toLocaleTimeString()
    })
    res.end('console.log("Hello World224444444")')
/*     const etag = req.headers['if-none-match']
    if (etag === '345') {
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=5000',
        'Last-Modified': '123456',
        'Etag': '345'
      })
      res.end()
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=5000',
        'Last-Modified': '123456',
        'Etag': '345'
      })
    } */
  }
})

app.listen(3000, () => {
  console.log('app starting at port 3000')
})