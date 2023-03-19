const { upload, get_video_list, video_comment } = require('../controller/videoController')
const { userTokenValidate } = require('../middleware/userValidate')
const { videoUploadValidate, videoCommentValidate } = require('../middleware/videoValidate')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/video'
})

router.post('/upload', userTokenValidate(), videoUploadValidate, upload)
router.post('/videoList', get_video_list)
router.post('/createComment', userTokenValidate(), videoCommentValidate, video_comment)

module.exports = router