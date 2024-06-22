const express = require('express')
const router = express.Router()
const endPoint = require('./endpointUrl')
const emailModule = require('../application')
const { uploadFiles } = require('../../../infrastructure/middleware')
const { generalUploadLimitSize } = uploadFiles
const dataFormEmail = generalUploadLimitSize({ fileSize: 50000000 }).array('send-email')

const emailRoute = ({ system }) => {
  const { utils } = system
  const { httpTrue, httpFalse } = utils.httpMessage
  const { throwErrorMessage } = utils

  router.post(endPoint.emailSend.urlPath, async (req, res) => {
    dataFormEmail(req, res, async function (err) {
      try {
        if (err) {
          throwErrorMessage({
            name: err.name,
            message: err.message
          })
        }
        const body = req.body
        const response = await emailModule.emailSend({
          system,
          body,
          attachments: req.files
        })
        httpTrue({
          res,
          data: response,
          message: 'Correo enviado'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se fue posible enviar el correo',
          code: 400
        })
      }
    })
  })
  return router
}

module.exports = emailRoute
