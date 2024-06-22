const express = require('express')
const router = express.Router()
const dataResource = require('./endpointUrl')
const resource = require('../application')

const dynamicBuildQuery = ({ system }) => {
  const {
    utils
    // middleware
  } = system
  // const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  // const authMiddleware = auth()

  router.post(
    dataResource.dynamicBuildQuery.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const tokenInfo = res.locals
        const response = await resource.dynamicBuildQuery({
          system,
          tokenInfo,
          body
        })
        httpTrue({
          res,
          data: response,
          message: 'Se obtuvo la información del query.'
        })
      } catch (error) {
        httpFalse({
          res,
          error: JSON.stringify(error),
          message: 'No se pudo generar el query.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = dynamicBuildQuery
