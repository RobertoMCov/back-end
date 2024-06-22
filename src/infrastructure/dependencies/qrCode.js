const QRCode = require('qrcode')

const generateQrCodeFile = ({ pathFiles, qrText }) =>
  new Promise((resolve, reject) => {
    QRCode.toFile(`${pathFiles}`, qrText, function (error) {
      if (error) return reject(error)
      resolve(true)
    })
  })

const generateQrCodeString = ({ qrText }) =>
  new Promise((resolve, reject) => {
    QRCode.toDataURL(qrText, function (error, url) {
      if (error) return reject(error)
      resolve(url)
    })
  })

module.exports = {
  generateQrCodeFile,
  generateQrCodeString
}
