const mongoose = require('mongoose')

const videoCommentSchema = new mongoose.Schema({
  video: {
    type: mongoose.Types.ObjectId,
    ref: 'Video'
  },
  content: {
    type: String,
    required: true
  },
  agree: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  reply: [
    {
      from: mongoose.Types.ObjectId,
      agree: {
        type: Number,
        default: 0
      },
      to: mongoose.Types.ObjectId,
      content: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = videoCommentSchema