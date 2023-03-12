const { register, login } = require('../controller/userController')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/user'
})

router.post('/login', login)
router.post('/register', register)

module.exports = router