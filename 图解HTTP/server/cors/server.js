const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain;charset=utf-8',
    "Access-Control-Allow-Origin": 'http://127.0.0.1:5500',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': true,
    'Set-Cookie': ['name=123']
  })
  res.end('你好,生活')
}).listen(3001, () => {
  console.log('app start listening at 3001')
})