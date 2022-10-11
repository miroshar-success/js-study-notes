const { user_model } = require('../model/index')

const register = (req, res) => {
  const user = req.body
  console.log(user)
  res.status(200).json({
    msg: 'success',
    code: 200
  })
}

const update = (req, res) => {

}

module.exports = {
  register,
  update
}