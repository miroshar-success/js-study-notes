const { User } = require('./user.model')
const { Image } = require('./image.model')
const { Video } = require('./video.model')
const { Subscribe } = require('./subscribe.modle')
const { VideoComment } = require('./video-comment.model')
const { VideoThumbModel } = require('./video-thumb.model')

module.exports = {
  user_model: User,
  image_model: Image,
  video_model: Video,
  subscribe_model: Subscribe,
  video_comment_model: VideoComment,
  video_thumb_model: VideoThumbModel
}