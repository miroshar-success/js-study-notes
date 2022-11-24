const mongoose = require('mongoose')

const subscribeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  channel: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  }
})

const Subscribe = mongoose.model('subscribe', subscribeSchema)

module.exports = {
  Subscribe
}