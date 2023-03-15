const { register, login, user_modify } = require('../controller/userController')
const {
  userRegisterValidate, userLoginValidate, userTokenValidate,
  modifyUserValidate
} = require('../middleware/userValidate')
const Router = require('@koa/router')

const router = new Router({
  prefix: '/api/user'
})

router.post('/login', userLoginValidate, login)
router.post('/register', userRegisterValidate, register)
router.post('/modifyUser', userTokenValidate(), modifyUserValidate, user_modify)

module.exports = router