// https://github.com/hapijs/joi
const Joi = require('joi')

module.exports = (schema = Joi.any(), data, status = 400) => {
  // koa-router middleware
  // Schema is undefined，allow all
  return (ctx, next) => {
    const {method} = ctx.request
    const record = ctx.request[method === 'POST' ? 'body' : 'query']
    const {error/*, value*/} = Joi.validate(record, schema)
    if (error) {
      const {message} = error.details[0]
      return ctx.throw(status, {message: message.replace(/"/g, '\'')})
      // return ctx.throw(status, error)
    }
    return next()
  }
}
