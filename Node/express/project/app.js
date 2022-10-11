const express = require('express')
const mongoose = require('mongoose')
const { user_router } = require('./router/user')

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


const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/api/v1/user', user_router)

app.listen(3000, () => {
  console.log('app starting at port 3000')
})