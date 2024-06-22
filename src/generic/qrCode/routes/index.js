const express = require('express')
const router = express.Router()
const dataResource = require('./endpointUrl')
const qr = require('../application')

const qrCode = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.post(
    dataResource.generateQR.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const tokenInfo = res.locals

        const qrGenerated = await qr.generate({
          system,
          tokenInfo,
          body
        })
        httpTrue({
          res,
          data: qrGenerated,
          message: 'Se genero correctamente el codigo QR'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'Error al generar codigo QR.',
          code: 400
        })
      }
    }
  )
  return router
}

module.exports = qrCode
