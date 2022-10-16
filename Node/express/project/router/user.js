const router = require('express').Router()
const user_controller = require('../controller/user.controller')

router.post('/register', user_controller.register)
router.post('/update', user_controller.update)
router.post('/login', user_controller.login)

module.exports = {
  user_router: router
}