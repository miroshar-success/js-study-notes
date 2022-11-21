const router = require('express').Router()
const {
  file_upload_image, search_image_file,
  file_upload_video, search_video_file
} = require('../controller/file.controller')

const { user_validate } = require('../middleware/user-validate')

router.post('/upload/image', file_upload_image)
router.post('/upload/video', user_validate, file_upload_video)
router.get('/search/image', search_image_file)
router.get('/search/video', search_video_file)

module.exports = {
  file_router: router
}