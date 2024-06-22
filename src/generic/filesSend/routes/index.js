const express = require('express')
const router = express.Router()
const endPoint = require('./endpointUrl')
const fileModule = require('../application')
const { uploadFiles } = require('../../../infrastructure/middleware')
const { generalUploadLimitSize } = uploadFiles
const dataFormFile = generalUploadLimitSize({ fileSize: 50000000 }).array('send-file')

const fileRoute = ({ system }) => {
  const { utils } = system
  const { httpTrue, httpFalse } = utils.httpMessage
  const { throwErrorMessage } = utils

  router.post(endPoint.fileSend.urlPath, async (req, res) => {
    dataFormFile(req, res, async function (err) {
      try {
        if (err) {
          throwErrorMessage({
            name: err.name,
            message: err.message
          })
        }
        const body = req.body
        const response = await fileModule.fileSend({
          system,
          body,
          attachments: req.files
        })
        httpTrue({
          res,
          data: response,
          message: 'Archivos enviados correctamente'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'Archivos enviados correctamente',
          code: 400
        })
      }
    })
  })
  return router
}

module.exports = fileRoute
