const fs = require('fs')
const zlib = require('zlib')
const readStream = fs.createReadStream('./data/iu.webp')
const writeStream = fs.createWriteStream('./data/copy.webp')
readStream.setEncoding('binary')

const chunks = []
let data = ''

readStream.on('data', chunk => {
  chunks.push(chunk)
  data += chunk
})
readStream.on('end', function() {
  writeStream.write(data, 'binary')
  // console.log(chunks)
  // writeStream.write(Buffer.concat(chunks), 'binary')
  writeStream.end()
  writeStream.on('finish', () => {
    console.log('写入完成')
  })
})


const string_chunk_array = []
const fileReadStream = fs.createReadStream('./data/input.txt')
const fileWriteStream = fs.createWriteStream('./data/output.txt', {
  flags: 'a'
})
fileReadStream.on('data', (chunk) => {
  string_chunk_array.push(chunk)
})
fileReadStream.on('end', () => {
  console.log(Buffer.concat(string_chunk_array).toString())
  // 写入流
  fileWriteStream.write(Buffer.concat(string_chunk_array))
})


fs.appendFile('./data/output.txt', '我是追加的内容', err => {
  if(err) console.log('error', err)
  console.log('追加成功')
})

// ----------- 管道流 -----------
const pipeReadStream = fs.createReadStream('./data/iu.webp')
pipeReadStream.pipe(fs.createWriteStream('./data/pipe.webp'))
pipeReadStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream('./data/pipe.webp.gz'))
