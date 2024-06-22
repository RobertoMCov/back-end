const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { gmcModelsApp } = completeCatalogs

const verifyToken = async ({ system, tokenInfo, verifyType = '' }) => {
  const { usuario, token } = tokenInfo
  const { operationCrud, utils } = system
  const { throwErrorMessage } = utils

  const userFound = await operationCrud({
    optionCrud: 'read',
    tableName: gmcModelsApp.xpCovGMCUsuario,
    dataQuery: {
      dataSelect: ['claveToken', 'correo', 'estatus'],
      dataWhere: { usuario: usuario }
    }
  })

  const { claveToken, correo, estatus } = userFound[0]

  if (claveToken !== token) {
    throwErrorMessage({
      name: 'tokenNotMatch',
      message: 'El token no coincide.'
    })
  }

  if (
    (estatus !== 'pendiente' && verifyType === 'activateAccountApp') ||
    (estatus !== 'alta' && verifyType === 'renewPasswordApp')
  ) {
    throwErrorMessage({
      name: 'statusNotAllowed',
      message: 'El estatus no esta permitido.'
    })
  }

  return {
    usuario,
    correo,
    token
  }
}

const activateAccountApp = async ({ tokenInfo, system }) => {
  const { operationCrud, utils } = system
  const { throwErrorMessage } = utils

  const { usuario } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'activateAccountApp'
  })

  const updateUser = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery: {
      dataUpdate: {
        estatus: 'alta',
        claveToken: ''
      },
      dataWhere: {
        usuario
      }
    }
  })

  if (updateUser < 1) {
    throwErrorMessage({
      name: 'updateFailed',
      message: 'No se pudo actualizar el estatus del usuario'
    })
  }

  return {
    userActivated: true
  }
}

const verifyTokenRecoverPasswordApp = async ({ tokenInfo, system }) => {
  const { correo } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'renewPasswordApp'
  })
  return {
    tokenVerified: true,
    correo
  }
}

const renewPasswordApp = async ({ body, system, tokenInfo }) => {
  const { operationCrud, utils, dependencies } = system
  const { throwErrorMessage, object } = utils
  const { security } = dependencies

  object.verifyArrayInObject({
    array: ['nuevaContrasena', 'confirmarContrasena'],
    object: body
  })

  if (body.nuevaContrasena.length < 8) {
    throwErrorMessage({
      name: 'shortPassword',
      message: 'La contraseña es muy corta.'
    })
  }

  if (body.nuevaContrasena !== body.confirmarContrasena) {
    throwErrorMessage({
      name: 'passwordNotMatch',
      message: 'Las contraseñas no coinciden.'
    })
  }
  const { usuario } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'renewPasswordApp'
  })

  const contrasenaArgon = await security.encrypt({
    password: body.nuevaContrasena
  })

  const userVerified = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery: {
      dataUpdate: { claveToken: '', contrasena: contrasenaArgon },
      dataWhere: { usuario }
    }
  })

  if (userVerified.length < 1) {
    throwErrorMessage({
      name: 'updateError',
      message: 'Error al actualizar el campo.'
    })
  }

  return {
    passwordUpdated: true
  }
}

module.exports = {
  verifyTokenRecoverPasswordApp,
  activateAccountApp,
  renewPasswordApp
}
