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

  router.post(
    dataResource.createResource.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const queryParams = req.query
        const tokenInfo = res.locals

        const resourceCreated = await resource.createResource({
          system,
          tokenInfo,
          queryParams,
          body
        })
        httpTrue({
          res,
          data: resourceCreated,
          message: 'Se creo correctamente el recurso.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo crear correctamente el recurso.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataResource.getInfoBuildQuery.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const queryParams = req.query
        const { catalogName } = req.params
        const locals = res.locals

        const getInfoResource = await resource.getInfoResource({
          catalogName,
          system,
          queryParams,
          locals
        })
        httpTrue({
          res,
          data: getInfoResource,
          message: 'Se obtuvo la información del recurso.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo obtener la información del recurso.',
          code: 400
        })
      }
    }
  )

  router.post(
    dataResource.upsertCatalog.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const queryParams = req.query
        const { catalog } = req.params
        const locals = res.locals
        const body = req.body

        const response = await resource.upsertResource({
          catalogName: catalog,
          body,
          system,
          queryParams,
          locals
        })
        httpTrue({
          res,
          data: response,
          message: 'Se pudo crear o actualizar los registros.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudieron crear o actualizar los registros.',
          code: 400
        })
      }
    }
  )

  router.post(
    dataResource.updateResource.urlPath,
    // authMiddleware,
    async (req, res) => {
      try {
        const queryParams = req.query
        const { catalog } = req.params
        const body = req.body

        const response = await resource.updateResource({
          catalogName: catalog,
          system,
          queryParams,
          body
        })
        httpTrue({
          res,
          data: response,
          message: 'Se pudieron actualizar los registros.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudieron actualizar los registros.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = crudResource
