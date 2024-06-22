const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { recoverTime, activateAccount } = require('../../../constants')
const { publicFrontEnd } = require('../../../environment')
const {
  verifyEnvironment
} = require('../../../infrastructure/utils/throwErrorMessage')
const { gmcModelsApp } = completeCatalogs

const recoverPasswordApp = async ({ body, system }) => {
  const { operationCrud, utils, dependencies } = system
  const { throwErrorMessage, object } = utils
  const { security, fileSystem, mail } = dependencies

  if (!publicFrontEnd) verifyEnvironment()

  object.verifyArrayInObject({ array: ['correo'], object: body })

  const userFound = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'read',
    dataQuery: {
      dataWhere: { correo: body.correo }
    }
  })

  if (!userFound.length) {
    throwErrorMessage({
      name: 'userNotExist',
      message: 'No se encontró el usuario dentro de la plataforma.'
    })
  }

  const { estatus, usuario, correo } = userFound[0]

  let token = ''
  let dataQuery = {}
  let contrasena = ''
  let contrasenaArgon = ''

  if (estatus === 'alta') {
    token = await security.jwtCreate({
      data: {
        usuario
      },
      expiresIn: recoverTime
    })

    dataQuery = {
      dataUpdate: { claveToken: token },
      dataWhere: { usuario }
    }
  } else if (estatus === 'pendiente') {
    token = await security.jwtCreate({
      data: {
        usuario
      },
      expiresIn: activateAccount
    })

    contrasena = security.randomPassword({ length: 16 })
    contrasenaArgon = await security.encrypt({ password: contrasena })
    dataQuery = {
      dataUpdate: { claveToken: token, contrasena: contrasenaArgon },
      dataWhere: { usuario }
    }
  } else {
    throwErrorMessage({
      name: 'statusNotAllowed',
      message: 'El estatus del usuario no esta permitido.'
    })
  }

  const updatedUser = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery
  })

  if (updatedUser < 1) {
    throwErrorMessage({
      name: 'updatedError',
      message: 'No se pudo actualizar la información.'
    })
  }

  const { nombre, apellidoPaterno, apellidoMaterno } = userFound[0]
  const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`

  if (estatus === 'pendiente') {
    await mail.sendEmail({
      apiOption: 'validateEmail',
      emailTo: [correo],
      subject: 'Activa tu cuenta.',
      templateData: {
        urlRedirect: `${publicFrontEnd}/activar-cuenta/${token}`,
        contrasena,
        nombreCompleto
      },
      fileSystem,
      operationCrud,
      throwErrorMessage,
      isHtmlEmail: true
    })

    return {
      resendVerification: true
    }
  } else {
    await mail.sendEmail({
      apiOption: 'recoverPasswordApp',
      emailTo: [correo],
      subject: 'Recupera tu cuenta',
      templateData: {
        urlRedirect: `${publicFrontEnd}/nueva-contrasena/${token}`,
        nombreCompleto
      },
      fileSystem,
      operationCrud,
      throwErrorMessage,
      isHtmlEmail: true
    })

    return {
      newPassword: true
    }
  }
}

module.exports = {
  recoverPasswordApp
}
