const { upload, get_video_list } = require('../controller/videoController')
const { userTokenValidate } = require('../middleware/userValidate')
const { videoUploadValidate } = require('../middleware/videoValidate')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/video'
})

router.post('/upload', userTokenValidate(), videoUploadValidate, upload)
router.post('/videoList', get_video_list)
module.exports = router