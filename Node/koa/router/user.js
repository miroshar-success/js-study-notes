const { register, login, user_modify, get_userinfo } = require('../controller/userController')
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
router.post('/getUserinfo', userTokenValidate(), get_userinfo)

module.exports = router