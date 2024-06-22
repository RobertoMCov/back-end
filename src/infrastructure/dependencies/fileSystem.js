const fs = require('fs')

const verifyAsyncFs = ({ path }) =>
  new Promise((resolve) => {
    fs.access(`${path}`, fs.constants.F_OK, (err) => {
      if (err) return resolve(false)
      resolve(true)
    })
  })

const createFolderAsync = ({ path }) =>
  new Promise((resolve) => {
    fs.mkdir(`${path}`, { recursive: true }, (error) => {
      if (error) return resolve(error)
      resolve(true)
    })
  })

const writeStream = ({ path, file }) =>
  new Promise((resolve) => {
    const writeStreamRequest = fs.createWriteStream(path)
    writeStreamRequest.write(file)
    resolve()
    writeStreamRequest.on('error', (error) => {
      if (error) return resolve(error)
    })
  })

const readFileAsync = ({ path, encoding = 'utf8' }) =>
  new Promise((resolve) => {
    fs.readFile(path,
      encoding,
      (err, data) => {
        if (err) return resolve(false)
        resolve(data)
      })
  })

const readDirectoryAsync = ({ path }) =>
  new Promise((resolve) => {
    fs.readdir(path, (err, files) => {
      if (err) return resolve(err)
      resolve(files)
    })
  })

module.exports = {
  verifyAsyncFs,
  createFolderAsync,
  writeStream,
  readFileAsync,
  readDirectoryAsync
}
