const { register, login } = require('../controller/userController')
const { userRegisterValidate, userLoginValidate } = require('../middleware/userValidate')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/user'
})

router.post('/login', userLoginValidate, login)
router.post('/register', userRegisterValidate, register)

module.exports = router