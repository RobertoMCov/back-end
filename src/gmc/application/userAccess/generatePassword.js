const { xpCovGMCUsuario } = require('../../domain/app')

const generatePassword = async ({ system }) => {
  const { dependencies } = system
  const { security } = dependencies
  const originalPassword = security.generateKey({ lengthKey: 16 })
  const encryptPassword = await security.encrypt({ password: originalPassword })
  const uuidUser = security.generateKey({ lengthKey: 10 })

  return {
    originalPassword,
    encryptPassword,
    uuidUser
  }
}

const changePasswordUser = async ({
  system,
  body
}) => {
  const { operationCrud, utils, dependencies } = system
  const { throwErrorMessage } = utils
  const { security } = dependencies

  const { nuevaContrasena, usuario } = body

  if (nuevaContrasena.length < 8) {
    throwErrorMessage({
      name: 'updateFailed',
      message: 'La contraseña debe ser mayor o igual a 8 caracteres'
    })
  }

  if (!nuevaContrasena || !usuario) {
    throwErrorMessage({
      name: 'passwordNotFound',
      message: 'Ingrese una contraseña válida.'
    })
  }

  const encryptPassword = await security.encrypt({ password: nuevaContrasena })
  const passwordUpdated = await operationCrud({
    tableName: xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery: {
      dataWhere: { usuario },
      dataUpdate: {
        contrasena: encryptPassword
      }
    }
  })

  if (passwordUpdated !== 1) {
    throwErrorMessage({
      name: 'updateError',
      message: 'Error al actualizar la contraseña.'
    })
  }

  return {
    passwordUpdated: true
  }
}

module.exports = {
  changePasswordUser,
  generatePassword
}
