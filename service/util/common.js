const path = require('path')
const fs = require('fs')
const next = require('next')
// https://github.com/showdownjs/showdown
const showdown = require('showdown')
const xssFilter = require('showdown-xss-filter')

const resolve = (d, ...p) => path.resolve(d, ...p) // Return to absolute path of file
const converter = new showdown.Converter({
  tables: true,
  extensions: [xssFilter],
  noHeaderId: true, // important to add this, else regex match doesn't work
})

const markdownToHtml = markdown => converter.makeHtml(markdown)

const getFiles = dir => { // Get all files
  let results = []
  fs.readdirSync(dir).forEach(file => {
    file = resolve(dir, file)
    const stat = fs.statSync(file)
    stat.isFile()
      ? results.push(file)
      : results.concat(getFiles(file)) // Is directory [...results,...readFiles(file)]
  })
  return results
}

const getDirectorys = dir => { // Get all first level folders
  let results = []
  fs.readdirSync(dir).forEach(filePath => {
    filePath = resolve(dir, filePath)
    const stat = fs.statSync(filePath)
    stat.isDirectory() && results.push(filePath)
  })
  return results
}

const base64_encode = file => new Buffer(fs.readFileSync(file)).toString('base64')

const mdToHtml = filePath => markdownToHtml(fs.readFileSync(filePath, 'utf-8'))

module.exports = {
  resolve,
  getFiles,
  getDirectorys,
  base64_encode,
  mdToHtml,
  nextApp: next({ dev:process.env.NODE_ENV !== 'production' })
}
