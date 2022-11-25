const router = require('express').Router()
const user_controller = require('../controller/user.controller')

const { user_validate } = require('../middleware/user-validate')

router.post('/register', user_controller.register)
router.post('/update', user_validate, user_controller.update)
router.post('/login', user_controller.login)
router.get('/subscribe_list', user_validate, user_controller.get_subscribe_list)
router.get('/:user_id', user_controller.get_channel_detail)

module.exports = {
  user_router: router
}