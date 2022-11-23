const router = require('express').Router()
const {
  file_upload_image, search_image_list,
  file_upload_video, search_video_list,
  search_video_detail
} = require('../controller/file.controller')

const { user_validate } = require('../middleware/user-validate')

router.post('/upload/image', file_upload_image)
router.post('/upload/video', user_validate, file_upload_video)
router.get('/search/image_list', search_image_list)
router.get('/search/video_list', search_video_list)
router.get('/search/video/:id', search_video_detail)

module.exports = {
  file_router: router
}