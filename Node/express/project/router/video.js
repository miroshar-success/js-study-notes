const { user_validate } = require('../middleware/user-validate')
const router = require('express').Router()
// 视频相关
const {
  search_video_list, search_video_detail,
  file_upload_video
} = require('../controller/video.controller')

// 视频评论相关
const {
  video_comment, video_comment_list, delete_video_comment
} = require('../controller/video-comment.controller')

const { video_thumb } = require('../controller/video-thumb.controller')

router.post('/upload', user_validate, file_upload_video)
router.get('/video_list', user_validate, search_video_list)
router.get('/detail/:id', user_validate, search_video_detail)
router.post('/comment', user_validate, video_comment)
router.get('/comment_list/:id', user_validate, video_comment_list)
router.post('/comment/delete_comment', user_validate, delete_video_comment)
router.post('/thumb', user_validate, video_thumb)

module.exports = {
  video_router: router
}