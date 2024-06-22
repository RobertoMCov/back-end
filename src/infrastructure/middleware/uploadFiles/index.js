const multer = require('multer')
const {
  generalUploadFilter,
  massivePersonalInfoFilter,
  fileFilterExcel,
  fileFilterImages
} = require('./filterFunction')

const generalUpload = multer({
  limits: { fileSize: 5000000 },
  fileFilter: generalUploadFilter
})

const generalUploadLimitSize = ({ fileSize = 5000000 }) => multer({
  limits: { fileSize },
  fileFilter: generalUploadFilter
})

const uploadMassive = multer({
  limits: { fileSize: 5000000 },
  fileFilter: massivePersonalInfoFilter
})

const uploadExcel = multer({
  limits: { fileSize: 5000000 },
  fileFilter: fileFilterExcel
})

const uploadImages = ({ fileSize = 5000000 }) => multer({
  limits: { fileSize },
  fileFilter: fileFilterImages
})

module.exports = {
  uploadExcel,
  generalUpload,
  uploadMassive,
  generalUploadLimitSize,
  uploadImages
}
