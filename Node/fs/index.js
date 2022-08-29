const fs = require('fs')
// 读取文件
fs.readFile('./data/input.txt', 'utf8', (err,data) => {
  if (err) {
    console.log('error', err)
  } else {
    console.log(data)
  }
})

fs.readFile('./data/input.txt', 'binary', (err, data) => {
  if(err) {
    console.log('error', err)
  } else {
    console.log(data)
  }
})

// 打开文件
fs.open('./data/input.txt', 'r', (err, data) => {
  console.log(data) // hello world
})

fs.open('./data/poem.txt', 'w', (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
  }
})

fs.open('./data/poem.txt', 'w', (err, fd) => {
  if (!err) {
    fs.writeFile('./data/poem.txt', '你好生活', (err, data) => {
      if (!err) {
        console.log('写入成功')
      }
    })
  }
})

// ------ 获取文件信息 -------
fs.stat('./data/input.txt', (err, stats) => {
  if(!err) {
    console.log(stats, stats.isFile(), stats.isDirectory())
    // true false
  }
})


// --------- 写入文件 -------
fs.writeFile('./data/input.txt', '我是通过fs写入的内容', (err) => {
  if (err) {
    console.log('write-error', err)
  } else {
    console.log('写入成功')
  }
})


// -------- 更改文件名 -------
/* fs.rename('./data/poem.txt', './data/poem1.txt', (err) => {
  if (err) {
    console.log('err', err)
  }
}) */


// 删除文件
fs.unlink('./data/poem1.txt', (err) => {
  if (!err) {
    console.log('delete success')
  }
})


// --- 创建目录 ------
fs.mkdir('./src/views', (err) => {
  if (!err) {
    console.log('create directory success')
  }
}) 


// ------ 读取目录 ------
fs.readdir('./src/', (err, data) => {
  if (!err) {
    data.forEach(file => {
      console.log('file', file) // file views/components
    })
  }
})

// ------ 检测文件路径是否存在 ------
fs.exists('./data/hello.txt', (err) => {
  console.log(err)  // false
})
fs.exists('./data/input.txt', (err) => {
  console.log(err)  // true
})


// ------ 追加写入内容 -------
fs.writeFile('./data/input.txt', 'hello, 我是追加的内容', {
  encoding: 'utf8',
  flag: 'a'
}, (err) => {
  if (!err) {
    console.log('追加成功')
  } else {
    console.log('write-error', err)
  }
})