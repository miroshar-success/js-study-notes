const get_sum = () => {
  let sum = 0
  for (let i = 0; i < 10000; i++) {
    sum += i
  }
  return sum
}

process.on('message', data => {
  const sum = get_sum()
  console.info('子进程id', process.pid, data)
  process.send(sum)
})