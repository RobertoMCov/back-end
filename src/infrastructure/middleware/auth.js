const { httpFalse } = require('../utils/httpMessage')
const operationCrud = require('../orm/operationCrud')
const dependencies = require('../../infrastructure/dependencies')
const utils = require('../utils')
const { completeCatalogs } = require('../../commons/catalogsToLoad')
const { gmcModelsApp } = completeCatalogs
// const { secret } = require('../../environment')

const authProfile = () => {
  return async (req, res, next) => {
    if ('authorization' in req.headers) {
      try {
        const { security, dateFormat } = dependencies
        const { throwErrorMessage } = utils
        const token = req.headers.authorization
        const verifyToken = await security.jwtVerify({ token })

        if (!verifyToken) {
          // TODO: Cerrar sesión
          await operationCrud({
            tableName: gmcModelsApp.xpCovGMCSesiones,
            optionCrud: 'delete',
            dataQuery: {
              dataDelete: token
            }
          })

          throwErrorMessage({
            name: 'unauthorized',
            message: 'La sesión ha expirado.'
          })
        }
        // const [licence = {}] = await operationCrud({
        //   optionCrud: 'read',
        //   tableName: gmcModelsApp.xpCovGMCConfiguracion,
        //   dataQuery: {
        //     dataSelect: [`CONVERT(VARCHAR(100), DECRYPTBYPASSPHRASE('${secret}', valor)) as licence`],
        //     dataWhere: {
        //       parametro: 'licence'
        //     }
        //   }
        // })
        const { usuario, perfil = '' } = verifyToken

        res.locals.usuario = usuario
        res.locals.token = token
        res.locals.perfil = perfil

        // const sesions = await operationCrud({
        //   optionCrud: 'read',
        //   tableName: gmcModelsApp.xpCovGMCSesiones,
        //   dataQuery: {
        //     dataSelect: ['token'],
        //     dataWhere: {}
        //   }
        // })

        // if (!sesions.find(sesion => sesion.token === token)) {
        //   throwErrorMessage({
        //     name: 'sessionExpired',
        //     message: 'La sesión caducó'
        //   })
        // }

        // if (sesions.length >= licence.licence) {
        //   throwErrorMessage({
        //     name: 'sessionExpired',
        //     message: 'No hay licencias disponibles'
        //   })
        // }
        const currentDate = dateFormat.getDateFormat({
          date: new Date(),
          formatDate: 'y-MM-dd HH:mm:ss'
        })

        await operationCrud({
          tableName: gmcModelsApp.xpCovGMCSesiones,
          optionCrud: 'update',
          dataQuery: {
            dataUpdate: {
              ultimaActualizacion: currentDate
            },
            dataWhere: {
              token
            }
          }
        })

        return next()
      } catch (error) {
        httpFalse({
          res,
          error,
          message: 'No se puede acceder a la información.',
          code: 401
        })
      }
    } else {
      httpFalse({
        res,
        error: { name: 'noToken', message: 'No se encontró ningún token.' },
        message: 'No se puede acceder a la información.',
        code: 401
      })
    }
  }
}

module.exports = authProfile
