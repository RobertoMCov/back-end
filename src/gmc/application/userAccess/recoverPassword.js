const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { gmcModelsApp } = completeCatalogs

const verifyToken = async ({ system, tokenInfo, verifyType = '' }) => {
  const { usuario, token } = tokenInfo
  const { utils, buildQuery } = system
  const { throwErrorMessage } = utils

  const {
    catalogData: userFound
  } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCUsuario',
      addAllColumns: true,
      hasPagination: false,
      whereInParams: {
        usuario
      }
    }
  })

  const { claveToken = '', correo = '', estatus = '' } = userFound[0]

  if (claveToken !== token) {
    throwErrorMessage({
      name: 'tokenNotMatch',
      message: 'El token no coincide.'
    })
  }

  if (
    (estatus !== 'pendiente' && verifyType === 'activateAccount') ||
    (estatus !== 'alta' && verifyType === 'renewPassword')
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

const activateAccount = async ({ tokenInfo, system }) => {
  const { operationCrud, utils } = system
  const { throwErrorMessage } = utils

  const { usuario } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'activateAccount'
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

const verifyTokenRecoverPassword = async ({ tokenInfo, system }) => {
  const { correo } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'renewPassword'
  })
  return {
    tokenVerified: true,
    correo
  }
}

const renewPassword = async ({ body, system, tokenInfo }) => {
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
  const { usuario = '' } = await verifyToken({
    tokenInfo,
    system,
    verifyType: 'renewPassword'
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
  verifyTokenRecoverPassword,
  activateAccount,
  renewPassword
}
