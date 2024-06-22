const express = require('express')
const router = express.Router()
const dataLoginRegisterApp = require('./endpointUrl')
const loginRegisterPlatformApp = require('../../application/registerUserApp')

const loginRegisterRoutesApp = ({ system }) => {
  const { utils } = system
  const { httpTrue, httpFalse } = utils.httpMessage

  router.post(dataLoginRegisterApp.createOneUserApp.urlPath, async (req, res) => {
    try {
      const body = req.body
      const userCreated = await loginRegisterPlatformApp.registerUpdateUserApp({
        body,
        system
      })
      httpTrue({
        res,
        data: userCreated,
        message: 'Usuario de la app creado correctamente.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo crear correctamente el usuario de la app.',
        code: 400
      })
    }
  }
  )

  router.post(
    dataLoginRegisterApp.updateOneUserApp.urlPath,
    async (req, res) => {
      try {
        const body = req.body
        const userUpdated = await loginRegisterPlatformApp.updateOneUserApp({
          body,
          system
        })
        httpTrue({
          res,
          data: userUpdated,
          message: 'Usuario de la app creado correctamente.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo crear correctamente el usuario de la app.',
          code: 400
        })
      }
    }
  )

  router.post(
    dataLoginRegisterApp.updateStatusUserApp.urlPath,
    async (req, res) => {
      try {
        const body = req.body
        const userStatus = await loginRegisterPlatformApp.updateStatusUserApp({
          body,
          system
        })
        httpTrue({
          res,
          data: userStatus,
          message: 'Usuario dado de baja correctamente'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'Error al dar de baja al usuario',
          code: 400
        })
      }
    }
  )

  return router
}
module.exports = loginRegisterRoutesApp
