const {
  security: { jwtVerify }
} = require('../dependencies')
const { httpFalse } = require('../utils/httpMessage')

const authProfile = () => {
  return async (req, res, next) => {
    if ('authorization' in req.headers) {
      try {
        const token = req.headers.authorization
        const verifyToken = await jwtVerify({ token })

        if (!verifyToken) {
          res.locals.usuario = ''
          res.locals.token = null
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
      res.locals.usuario = ''
      res.locals.token = null

      return next()
    }
  }
}

module.exports = authProfile
