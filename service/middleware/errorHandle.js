module.exports = (ctx, next) => {
  return next().catch((error) => {
    const {status} = error
    switch (status) {
      case 200:
        ctx.body = {
          status,
          describe: '数据已处理并返回',
          record: error.record || {},
          message: error.message || '请求成功',
        }
        break
      case 400:
        ctx.body = {
          status,
          describe: '参数验证未通过',
          message: error.message,
        }
        break
      case 401:
        // ctx.status = 301
        // ctx.redirect('/login') // 重定向到login
        ctx.body = {
          status,
          describe: '无权访问/获取',
          message: error.originalError
            ? error.originalError.message
            : error.message,
        }
        break
      case 406:
        ctx.body = {
          status,
          describe: '数据冲突/重复',
          message: error.message,
        }
        break
      case 500:
        ctx.body = {
          status,
          describe: '服务器错误',
          message: error.message || '服务器暂时不能理解这条请求',
        }
        break
      default:
        throw error
    }
  })
}