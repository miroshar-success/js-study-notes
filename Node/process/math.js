function sum() {
  let s = 0
  for(let i = 0; i <= 10000; i++) {
    s += i
  }
  return s
}

process.on('message', (message) => {
  console.log('子进程id', process.pid, message)
  const data = sum()
  process.send(data) // 发送消息给主进程
})
