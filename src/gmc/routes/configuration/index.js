const express = require('express')
const router = express.Router()
const dataConfiguration = require('./endpointUrl')
const configurationResources = require('../../application/configuration')

const configurationRoutes = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.get(
    dataConfiguration.selectAppBranchOffice.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const query = req.query
        const infoAppBranchOffice =
          await configurationResources.getInfoSelectAppBranchOffice({
            tokenInfo,
            system,
            query
          })
        httpTrue({
          res,
          data: infoAppBranchOffice,
          message:
            'Se trajo la información para la pantalla de app-empresa-sucursal.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message:
            'No se pudo traer la información para la pantalla de app-empresa-sucursal.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataConfiguration.platformModulesData.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const queryParams = req.query
        const componentData = await configurationResources.getComponentData({
          queryParams,
          system
        })
        httpTrue({
          res,
          data: componentData,
          message: 'Información para la asignación de componentes.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message:
            'No se pudo traer la información para la asignación de componentes.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataConfiguration.getComponentUser.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const params = req.query
        const locals = res.locals

        const componentDataUser =
          await configurationResources.getComponentDataUser({
            system,
            params,
            locals
          })
        httpTrue({
          res,
          data: componentDataUser,
          message: 'Se trajo la información de los componentes del usuario.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message:
            'No se pudo traer la información de los componentes del usuario.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataConfiguration.getBusinessUser.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const query = req.query

        const componentDataUser = await configurationResources.getBusinessUser({
          query,
          system
        })
        httpTrue({
          res,
          data: componentDataUser,
          message: 'Empresas de un usuario.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo traer las empresas de un usuario.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = configurationRoutes
