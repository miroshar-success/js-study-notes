const express = require('express')
const multer = require('multer')
const app = express()
const fs = require('fs')
const path = require('path')

const upload = multer({ dest: './uploads' })
// 上传单个文件
app.post('/api/v1/upload/image', upload.single('file'), function (req, res, next) {
  console.log('file:', req.file)
  console.log('text', req.body)
  res.json({
    code: 0,
    message: 'hello world'
  })
})
// 上传多个文件
app.post('/api/v1/upload/videos', upload.array('photos', 10), function (req, res) {
  console.log(req.files)
  console.log(req.body)
  res.json({
    code: 0,
    message: '文件全部上传成功'
  })
})

app.get('/', function (req, res) {
  fs.readFile(path.resolve(__dirname, 'public/index.html'), (err, data) => {
    res.end(data)
  })
})

app.listen(3000, () => {
  console.log('app starting at port 3000')
})