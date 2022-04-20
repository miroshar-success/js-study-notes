const http = require('http')
const fork = require('child_process').fork  // 开启子进程

const server = http.createServer(function(req, res){
  if(req.url === '/math') {
    console.info('主进程id', process.pid)
    const mathProcess = fork('./math.js')
    mathProcess.send('开始计算')
    mathProcess.on('message', data => { // 接受子进程的信息
      res.end('hello' + data)
    })
    mathProcess.on('close', () => {
      mathProcess.kill()
      res.end('error')
    })
  }
})

server.listen(3000, () => {
  console.info('app starting at port 3000')
})
