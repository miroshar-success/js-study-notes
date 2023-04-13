const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
/*   const html = fs.readFileSync('./index.html', 'utf-8')
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html) */
  // node.js重定向
  if (req.url === '/player') {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8;'
    })
    res.end(`<div>Hello, 欢迎回来!</div>`)
  }
  // 301 永久重定向
  // 302 临时重定向
  console.log(req.url)
  if (req.url === '/') {
    res.writeHead(301, {
      'Location': '/player'
    })
    res.end()
  }
})

app.listen(3000, () => {
  console.log('app listen at port 3000')
})