const mongoose = require('mongoose')

const videoThumbSchema = new mongoose.Schema({
  video: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'video'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  like: {
    type: Boolean,
    default: false
  },
  dislike: {
    type: Boolean,
    default: false
  }
})

const VideoThumbModel = mongoose.model('video_thumb', videoThumbSchema)

module.exports = {
  VideoThumbModel
}