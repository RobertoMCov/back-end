const express = require('express')
const router = express.Router()
const dataGMCMainViews = require('./endpointUrl')
const gmcMainViewResources = require('../../application/gmcMainViews')

const configurationRoutes = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.get(
    dataGMCMainViews.getBusinessPlatform.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const businessInfo =
          await gmcMainViewResources.getBusinessPlatform({
            tokenInfo,
            system
          })
        httpTrue({
          res,
          data: businessInfo,
          message:
            'Se obtuvieron todas las empresas del aplicativo.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message:
            'No se pudieron obtener las empresas del aplicativo.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataGMCMainViews.getBranchOfficePlatform.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const businessInfo =
          await gmcMainViewResources.getBranchOfficePlatform({
            tokenInfo,
            system
          })
        httpTrue({
          res,
          data: businessInfo,
          message:
            'Se obtuvieron todas las sucursales del aplicativo.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message:
            'No se pudieron obtener todas las sucursales del aplicativo.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = configurationRoutes
