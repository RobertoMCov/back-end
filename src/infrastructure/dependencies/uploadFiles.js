const multer = require('multer')
const { throwErrorMessage } = require('../utils')

const defaultFormat = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain'
]

const uploadFile = ({ allowedFormats = defaultFormat, fileSize = 5 }) => {
  const fileFilter = ({ req, file, cb }) => {
    const mimeTypeFile = file.mimetype.toLowerCase()
    if (!allowedFormats.includes(mimeTypeFile)) {
      return cb(
        throwErrorMessage({
          name: 'fileNotAllowed',
          message: 'El archivo no esta permitido.'
        }),
        false
      )
    }
    cb(null, true)
  }

  multer({
    limits: { fileSize: fileSize * 1000000 },
    fileFilter
  })
}

module.exports = {
  uploadFile
}
