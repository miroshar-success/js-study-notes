const router = require('express').Router()
const { unsubscribe_user } = require('../controller/subscribe.controller')
const { user_validate } = require('../middleware/user-validate')

router.post('/user', user_validate, unsubscribe_user)

module.exports = {
  unsubscribe_router: router
}