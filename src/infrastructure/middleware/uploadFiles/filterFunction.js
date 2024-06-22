const generalFormat = ['jpg', 'jpeg', 'png', 'pdf', 'xlsx', 'csv']
const massiveFormats = ['xlsx', 'csv']
const excelFormat = ['xlsx']
const imageFormats = ['jpg', 'jpeg', 'png', 'jpeg']

function ErrorMessage ({ name, message }) {
  this.name = name
  this.message = message
}

const fileFilterExcel = (req, file, cb) => {
  const fileExtension = file.originalname.split('.').pop().toLowerCase()
  if (!excelFormat.includes(fileExtension)) {
    return cb(
      new ErrorMessage({
        name: 'fileNotAllowed',
        message: 'Archivo no permitido.'
      }),
      false
    )
  }
  cb(null, true)
}

const generalUploadFilter = (req, file, cb) => {
  const mimeTypeFile = file.originalname.split('.').pop().toLowerCase()
  if (!generalFormat.includes(mimeTypeFile)) {
    return cb(
      new ErrorMessage({
        name: 'fileNotAllowed',
        message: 'Archivo no permitido.'
      }),
      false
    )
  }
  cb(null, true)
}

const massivePersonalInfoFilter = (req, file, cb) => {
  const fileExtension = file.originalname.split('.').pop().toLowerCase()
  if (!massiveFormats.includes(fileExtension)) {
    return cb(
      new ErrorMessage({
        name: 'fileNotAllowed',
        message: 'Archivo no permitido.'
      }),
      false
    )
  }
  cb(null, true)
}

const fileFilterImages = (req, file, cb) => {
  const fileExtension = file.originalname.split('.').pop().toLowerCase()
  if (!imageFormats.includes(fileExtension)) {
    return cb(
      new ErrorMessage({
        name: 'fileNotAllowed',
        message: 'Archivo no permitido.'
      }),
      false
    )
  }
  cb(null, true)
}

module.exports = {
  fileFilterExcel,
  generalUploadFilter,
  massivePersonalInfoFilter,
  fileFilterImages
}
