const express = require('express')
const router = express.Router()
const dataAccessUserApp = require('./endpointUrl')
const accessUserPlatformApp = require('../../application/userAccessApp')

const userAccessRoutesApp = ({ system }) => {
  const { utils, middleware } = system
  const { auth } = middleware
  const { httpTrue, httpFalse } = utils.httpMessage
  const authMiddleware = auth()

  router.get(dataAccessUserApp.generatePasswordApp.urlPath, async (req, res) => {
    try {
      const userAccessVerified = await accessUserPlatformApp.generatePasswordApp({
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

  router.post(dataAccessUserApp.logInApp.urlPath, async (req, res) => {
    try {
      const body = req.body
      const { tipoAplicativo = 'web' } = req.body
      const userLogged = await accessUserPlatformApp.logInApp({
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
        message: 'El usuario inicio sesión correctamente desde la app.'
      })
    } catch (error) {
      httpFalse({
        res,
        error,
        message: 'No se pudo iniciar sesión correctamente desde la app.',
        code: 400
      })
    }
  })

  router.post(dataAccessUserApp.recoverPasswordApp.urlPath, async (req, res) => {
    try {
      const body = req.body
      const recoveredPassword = await accessUserPlatformApp.recoverPasswordApp({
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
    dataAccessUserApp.activateAccountApp.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const tokenVerified = await accessUserPlatformApp.activateAccountApp({
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
    dataAccessUserApp.verifyTokenRecoverEndpointDataApp.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const tokenVerified =
          await accessUserPlatformApp.verifyTokenRecoverPassword({
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
    dataAccessUserApp.changePasswordApp.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const tokenInfo = res.locals
        const body = req.body
        const updatePasswordApp = await accessUserPlatformApp.renewPassword({
          tokenInfo,
          system,
          body
        })
        httpTrue({
          res,
          data: updatePasswordApp,
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
    dataAccessUserApp.changePasswordApp.urlPath,
    authMiddleware,
    async (req, res) => {
      try {
        const body = req.body
        const updatePasswordApp = await accessUserPlatformApp.changePasswordUserApp({
          system,
          body
        })
        httpTrue({
          res,
          data: updatePasswordApp,
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

module.exports = userAccessRoutesApp
