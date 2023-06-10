// 开启多子线程
const http = require('http')
const fork = require('child_process').fork

http.createServer(function(req, res) {
  if (req.url === '/computed') {
    const child_process = fork('./computed.js')
    child_process.send('开始计算')
    console.info('主进程id', process.pid)
    child_process.on('message', (data) => {
      console.log('计算结果', data)
      child_process.kill()
    })
    res.end('hello')
  }
}).listen(3000)

console.info(process.pid)
// 多个子进程共享一个TCP连接, 提供一份网络服务!
const core_length = require('os').cpus().length
console.log('核:', core_length)