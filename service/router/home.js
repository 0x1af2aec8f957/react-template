const app = require('../util/common').nextApp
// const handle = app.getRequestHandler()

module.exports = {
  path: '/',
  method: 'get',
  function: async (ctx, next) => {
    // handle(req, res, parsedUrl)
    ctx.body = await app.render(ctx.req, ctx.res, '/', ctx.query)
  },
}
