const Koa = require('koa')
const mongoose = require('mongoose')
const { koaBody } = require('koa-body')
// router
const userRouter = require('./router/user')
const videoRouter = require('./router/video')
const path = require('path')

// 连接数据库
const connect = () => {
  mongoose.connect('mongodb://127.0.0.1', {
    autoIndex: false,
    dbName: 'koa'
  }).then(() => {
    console.log('database is connected')
  }).catch(err => {
    console.log(err)
  })
}
connect()

const app = new Koa()
/* const router = new Router({
  prefix: '/api/v1/'
}) */

/* app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async ctx => {
  ctx.body = 'hello world'
}) */
/* router.get('player/:id', ctx => {
  console.log(ctx.request.params)
  ctx.body = [
    {
      firstName: 'kyrie',
      lastName: 'irving',
      age: 30
    }
  ]
})

router.get('singer', ctx => {
  ctx.body = ['周杰伦', '王力宏', '林俊杰']
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('app starting listen 3000')
}) */

app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    uploadDir: path.resolve(__dirname, 'videos')
  }
}))
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(videoRouter.routes()).use(videoRouter.allowedMethods())

app.listen(3000, () => {
  console.log('app starting at 3000')
})