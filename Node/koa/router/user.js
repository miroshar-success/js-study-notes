const { register, login } = require('../controller/userController')
const { userRegisterValidate } = require('../middleware/userValidate')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/user'
})

router.post('/login', login)
router.post('/register', userRegisterValidate, register)

module.exports = router