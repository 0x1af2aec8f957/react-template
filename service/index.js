// https://koajs.com/
const Koa = require('koa')
// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser')
// https://github.com/koajs/logger
const logger = require('koa-logger')
const errorHandle = require('./middleware/errorHandle')
const router = require('./router')

const app = new Koa()

// db && (app.context.db = db) // 创建 ctx 的原型，使用：console.log(ctx.db)

module.exports = ()=> require('./util/common').
nextApp.
prepare().
then(() => {
  app.use(logger()).
  use(errorHandle).
  use(bodyParser()).
  use(router.routes()).
  use(router.allowedMethods()).
  listen(3001)
})
