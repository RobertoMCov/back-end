const express = require('express')
const router = express.Router()
const dataAccessUser = require('./endpointUrl')
const accessUserPlatform = require('../../application/userAccess')

const userAccessRoutes = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.get(dataAccessUser.generatePassword.urlPath, async (req, res) => {
    try {
      const userAccessVerified = await accessUserPlatform.generatePassword({
        system
      })
      httpTrue({
        res,
        data: userAccessVerified,
        message: 'Contraseña generada correctamente.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo generar correctamente la contraseña.',
        code: 400
      })
    }
  })

  router.post(dataAccessUser.logIn.urlPath, async (req, res) => {
    try {
      const body = req.body
      const { tipoAplicativo = 'web' } = req.body
      const userLogged = await accessUserPlatform.logIn({
        body,
        system,
        tipoAplicativo
      })
      httpTrue({
        res,
        data: {
          ...userLogged,
          modules: [
            {
              aplicativo: 'gestorCobranzaMobile',
              descripcionA: 'Gestor Cobranza Mobile',
              applicationModuleGMC: [
                {
                  modulo: 'autorizacionesMobile',
                  descripcionM: 'Mobile - Autorizaciones del aplicativo gestor',
                  moduleComponentGMC: [
                    {
                      componente: 'verautorizacionesMobile',
                      descripcionC: 'Mobile - Visualizacion de pantalla de autorizaciones en el gestor',
                      idXpCovGMCComponente: 37
                    }
                  ]
                }
              ]
            }
          ]
        },
        message: 'El usuario inicio sesión correctamente.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo iniciar sesión correctamente.',
        code: 400
      })
    }
  })

  router.post(dataAccessUser.recoverPassword.urlPath, async (req, res) => {
    try {
      const body = req.body
      const recoveredPassword = await accessUserPlatform.recoverPassword({
        body,
        system
      })
      httpTrue({
        res,
        data: recoveredPassword,
        message: 'Se envió un correo para recuperar contraseña.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se puede enviar un correo para recuperar contraseña.',
        code: 400
      })
    }
  })

  router.get(
    dataAccessUser.activateAccount.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const tokenVerified = await accessUserPlatform.activateAccount({
          tokenInfo,
          system
        })
        httpTrue({
          res,
          data: tokenVerified,
          message: 'Cuenta activada correctamente.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo activar la cuenta.',
          code: 400
        })
      }
    }
  )

  router.get(
    dataAccessUser.verifyTokenRecoverEndpointData.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const tokenVerified =
          await accessUserPlatform.verifyTokenRecoverPassword({
            tokenInfo,
            system
          })
        httpTrue({
          res,
          data: tokenVerified,
          message: 'Token de recuperar contraseña verificado correctamente.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo verificar el token de recuperar contraseña.',
          code: 400
        })
      }
    }
  )

  router.post(
    dataAccessUser.changePassword.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const body = req.body
        const updatedPassword = await accessUserPlatform.renewPassword({
          tokenInfo,
          system,
          body
        })
        httpTrue({
          res,
          data: updatedPassword,
          message: 'Contraseña actualizada.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo actualizar la contraseña.',
          code: 400
        })
      }
    }
  )

  router.post(
    dataAccessUser.updatePassword.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const updatedPassword = await accessUserPlatform.changePasswordUser({
          system,
          body
        })
        httpTrue({
          res,
          data: updatedPassword,
          message: 'Contraseña actualizada.'
        })
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se pudo actualizar la contraseña.',
          code: 400
        })
      }
    }
  )

  return router
}

module.exports = userAccessRoutes
