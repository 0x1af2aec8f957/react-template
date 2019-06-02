// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {resolve, getFiles} = require('../util/common')
const validator = require('../middleware/validator')
const files = getFiles(resolve('service', 'router')).filter(item => !~item.indexOf('index.js'))
const routes = files.map(path => require(path))

const router = new Router()

routes.forEach(({path, method, schema, function: func}) => router[method](path, validator(schema), func))

router.use('/', router.routes(), router.allowedMethods())

module.exports = router
