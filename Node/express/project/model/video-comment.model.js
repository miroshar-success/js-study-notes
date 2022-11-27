const mongoose = require('mongoose')

const videoCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  video: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'video'
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  }
})

const VideoComment = mongoose.model('video_comment', videoCommentSchema)

module.exports = {
  VideoComment
}