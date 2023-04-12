const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

const app = http.createServer((req, res) => {
  const gzip_html = fs.readFileSync('./index.html')
  const html = fs.readFileSync('./index.html', 'utf-8')
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Encoding': 'gzip'
  })
  res.end(zlib.gzipSync(gzip_html))
  // res.end(html)
})

app.listen(3000, () => {
  console.log('app listening...')
})