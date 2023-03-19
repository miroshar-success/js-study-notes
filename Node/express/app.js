const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { user_router } = require('./project/router/user')
const { video_router } = require('./project/router/video')
const { subscribe_router } = require('./project/router/subscribe')
const { unsubscribe_router } = require('./project/router/unsubscribe')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/express', {
  autoIndex: false
}).then(() => {
  console.log('mongodb connect success')
}).catch(err => {
  console.log(err)
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5050')
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'content-type')
  next()
})

app.use('/api/v1/user', user_router)
app.use('/api/v1/video', video_router)
app.use('/api/v1/subscribe', subscribe_router)
app.use('/api/v1/unsubscribe', unsubscribe_router)

app.listen(3000, () => {
  console.log('app starting at port 3000')
})