const router = require('express').Router()
const { user_validate } = require('../middleware/user-validate')
const { subscribe_user } = require('../controller/subscribe.controller')
router.post('/user', user_validate, subscribe_user)

module.exports = {
  subscribe_router: router
}