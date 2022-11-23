const router = require('express').Router()
const { subscribe_video } = require('../controller/subscribe.controller')
router.post('/video', subscribe_video)

module.exports = {
  subscribe_router: router
}