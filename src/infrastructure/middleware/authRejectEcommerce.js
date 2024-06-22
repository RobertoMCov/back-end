const {
  security: { jwtVerify }
} = require('../dependencies')
const { httpFalse } = require('../utils/httpMessage')
const { throwErrorMessage } = require('../utils/throwErrorMessage')

const rejectAuth = () => {
  return async (req, res, next) => {
    if ('authorization' in req.headers) {
      try {
        const token = req.headers.authorization
        const verifyToken = await jwtVerify({ token })

        if (!verifyToken) {
          throwErrorMessage({ name: 'expireToken', message: 'Token expirado.' })
        } else {
          const { claveUsuario } = verifyToken

          res.locals.usuario = claveUsuario
          res.locals.token = token
        }

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

module.exports = rejectAuth
