const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const Video = mongoose.model('video', videoSchema)
module.exports = {
  Video
}