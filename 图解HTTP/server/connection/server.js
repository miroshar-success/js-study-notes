const http = require('http')
const fs = require('fs')
const app = http.createServer((req, res) => {
  const url = req.url
  console.log(url)
  if (url === '/favicon.ico') {
    res.end('')
  } else if (url === '/') {
    const html = fs.readFileSync('./index.html', 'utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Connection': 'close'
    })
    res.end(html)
  } else if (url.includes('images')) {
    const img = fs.readFileSync('./images/iu.webp')
    console.log('img', img)
    res.writeHead(200, {
      'Content-Type': 'image/webp',
      'Connection': 'close'
    })
    res.end(img)
  } else {
    const js = fs.readFileSync('.' + url, 'utf-8')
    res.end(js)
  }
})

app.listen(3000, () => {
  console.log('listening...')
})