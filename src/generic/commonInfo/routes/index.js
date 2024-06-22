const express = require('express')
const router = express.Router()
const dataAccessOrder = require('./endpointUrl')
const orderAppMobile = require('../application/postalCodeInfo')

const userAccessRoutes = ({ system }) => {
  const { utils } = system
  // const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  // const authMiddleware = auth()

  router.get(
    dataAccessOrder.getPostalCode.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const params = req.query
        const allProducts = await orderAppMobile.getPostalCode({
          params,
          system
        })
        httpTrue({
          res,
          data: allProducts,
          message: 'Se obtuvo la información del código Postal.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo obtener la información del código Postal.',
          code: 400
        })
      }
    }
  )

  router.get(dataAccessOrder.getIpAddress.urlPath, async (req, res) => {
    try {
      httpTrue({
        res,
        data: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        message: 'Se pudo obtener la dirección ip de la petición.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo obtener la dirección ip de la petición.',
        code: 400
      })
    }
  })

  return router
}

module.exports = userAccessRoutes
