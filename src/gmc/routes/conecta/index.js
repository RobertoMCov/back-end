const express = require('express')
const router = express.Router()
const conectaRutas = require('./endpointUrl')
const conecta = require('../../application/conecta')

const conectaRoutes = ({ system }) => {
  const { utils } = system
  const { httpTrue, httpFalse } = utils.httpMessage

  router.get(
    conectaRutas.opcionesCita.urlPath,
    async (req, res) => {
      try {
        const infoAppBranchOffice =
          await conecta.getOpcionesCita({
            system,
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
  
  return router
}

module.exports = conectaRoutes
