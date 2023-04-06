const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8',
    "Access-Control-Allow-Origin": '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Max-Age': '1000'
  })
  res.end('你好,生活')
}).listen(3001, () => {
  console.log('app start listening at 3001')
})