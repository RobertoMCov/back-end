const express = require('express')
const router = express.Router()
const dataLoginRegister = require('./endpointUrl')
const loginRegisterPlatform = require('../../application/registerUser')

const loginRegisterRoutes = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.post(
    dataLoginRegister.createOneUser.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const locals = res.locals
        const userCreated = await loginRegisterPlatform.registerUpdateUser({
          body,
          system,
          locals
        })
        httpTrue({
          res,
          data: userCreated,
          message: 'Usuario creado correctamente.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo crear correctamente el usuario.',
          code: 400
        })
      }
    }
  )

  router.post(dataLoginRegister.createOneUserWithoutAuthorization.urlPath, async (req, res) => {
    try {
      const body = req.body
      const userCreatedWithoutAuthorization = await loginRegisterPlatform.registerUpdateUserWoAuth({
        body,
        system
      })
      httpTrue({
        res,
        data: userCreatedWithoutAuthorization,
        message: 'Usuario creado correctamente app.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo crear correctamente el usuario app.',
        code: 400
      })
    }
  }
  )

  router.post(
    dataLoginRegister.updateOneUser.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const userUpdated = await loginRegisterPlatform.updateOneUser({
          body,
          system
        })
        httpTrue({
          res,
          data: userUpdated,
          message: 'Usuario actualizado correctamente.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo actualizar correctamente el usuario.',
          code: 400
        })
      }
    }
  )

  return router
}
module.exports = loginRegisterRoutes
