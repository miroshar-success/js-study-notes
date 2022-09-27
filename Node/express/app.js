const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

router.get('/api/player', (req, res) => {
  res.statusMessage = 'success';
  res.json([
    {
      firstName: 'kyrie',
      lastName: 'irving',
      age: 30
    },
    {
      firstName: 'lebron',
      lastName: 'james',
      age: 38
    }
  ])
})

router.post('/api/create_player', (req, res) => {
  const player = req.body;
  console.log(player)
  res.send({
    code: 200,
    message: 'success'
  })
})

app.use(router)

app.listen(3000, () => {
  console.log('app starting listening')
})