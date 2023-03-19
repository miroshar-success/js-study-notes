const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploader: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = videoSchema