const express = require('express')
const router = express.Router()
const dataResource = require('./endpointUrl')
const resource = require('../application')

const crudResource = ({ system }) => {
  const {
    utils
    // middleware
  } = system
  // const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  // const authMiddleware = auth()

  router.get(
    dataResource.getCatalog.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const queryParams = req.query
        const tokenInfo = res.locals
        const { catalog } = req.params
        const response = await resource.catalogs.getCatalog({
          catalogName: catalog,
          system,
          tokenInfo,
          queryParams
        })
        httpTrue({
          res,
          data: response,
          message: 'Se obtuvo la información del recurso.'
        })
      } catch (error) {
        console.log('error', error)
        httpFalse({
          res,
          error,
          message: 'No se pudo obtener la información del recurso.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = crudResource
