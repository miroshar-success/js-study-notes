const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const html = fs.readFileSync('./index.html', 'utf8')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html)
}).listen(3000, () => {
  console.log('app start listening at port 3000')
})

