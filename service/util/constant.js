const mongoose = require('mongoose')

exports.Regex = {
  PHONE: /^1[3-8]{1}\d{9}$/,
  EMAIL: /^[\w|\d]+@[\w|\d]+\.[\w|\d]+$/,
  ACCOUNT: /(^1[3-8]{1}\d{9}$)|(^[\w|\d]+@[\w|\d]+\.[\w|\d]+$)/,
  OBJECT_ID: mongoose.Schema.Types.ObjectId,
}

exports.SECRET = 'asdgfkjsdgfjkdjhfjdh_dfhjbfhjdhj'

exports.PROCESS_DIR = process.cwd()

exports.SENDGRID_API_KEY = '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' // development test key
