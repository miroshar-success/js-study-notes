const http = require('http')
// const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.statusCode = 200
/*   fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html'})
      res.write('Something went wrong')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html'})
      res.write(data.toString())
    }
    res.end()
  }) */
  // res.setHeader('Content-Type', 'text/plain')
  // res.setHeader('Content-Type', 'text/html')
  // res.setHeader('Set-Cookie', ['language=javascript'])
  // res.writeHead(200, 'success', {
  //   'Content-Type': 'text/html',
  //   'Set-Cookie': ['language=css']
  // })
  // res.write('hello world')
  // res.end()
})

/* server.listen(3000, () => {
  console.log('app starting at port 3000')
}) */


/* http.createServer((req, res) => {
  if (req.url === '/login') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html;charset=utf-8'
        })
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8'
        })
      }
      res.write(data.toString())
      res.end()
    })
  }
  if (req.url === '/api/login') {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      console.log('data', data)
      res.end('success')
    })
  }
}).listen(3000, () => {
  console.log('app starting at port 3000')
}) */

const path = require('path')
const url = require('url')

http.createServer((req, res) => {
  if (req.url === '/api/users') {
    res.setHeader('Content-Type', 'text/plain')
    fs.readFile(path.resolve(__dirname, 'data.json'), (err, data) => {
      if (err) {
        res.end('hello world')
      } else {
        res.end(data.toString())
      }
    })
  }
  const { pathname, query } = url.parse(req.url)
  if (req.url === '/api/add_user') {
    console.log('add-user', req.url)
  }
}).listen(3000, () => {
  console.log('app starting at port 3000')
})