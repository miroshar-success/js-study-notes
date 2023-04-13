const fs = require('fs')
const http = require('http')

const app = http.createServer((req, res) => {
  const html = fs.readFileSync('./index.html', 'utf8')
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Security-Policy':'default-src \'self\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src https://*.baidu.com;'
  })
  res.end(html)
})

app.listen(3000, () => {
  console.log('app starting at port 3000')
})