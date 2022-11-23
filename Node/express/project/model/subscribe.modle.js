const mongoose = require('mongoose')

const subscribeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  video: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'video'
  }
})

const Subscribe = mongoose.model('subscribe', subscribeSchema)

module.exports = {
  Subscribe
}