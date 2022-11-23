const { User } = require('./user.model')
const { Image } = require('./image.model')
const { Video } = require('./video.model')
const { Subscribe } = require('./subscribe.modle')

module.exports = {
  user_model: User,
  image_model: Image,
  video_model: Video,
  subscribe_model: Subscribe
}