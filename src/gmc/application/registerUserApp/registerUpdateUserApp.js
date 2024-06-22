const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { activateAccount } = require('../../../constants')
const { gmcModelsApp } = completeCatalogs

const verifyKeys = async ({ tablesToVerify, body, buildQuery, system }) => {
  const checkingKeys = tablesToVerify.reduce((acum, item) => {
    const { bodyKey, modelName, keyIntelisis } = item
    const valueToVerify = body[bodyKey]

    if (valueToVerify) {
      acum = [
        ...acum,
        {
          modelName,
          arrayWhereIn: [
            {
              modelName,
              columnName: keyIntelisis,
              arrayConditions: [valueToVerify]
            }
          ]
        }
      ]
    }

    return acum
  }, [])

  const getDataToVerify = checkingKeys.map((item) => {
    const { modelName, arrayWhereIn } = item
    return buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName,
        addAllColumns: true,
        hasPagination: false,
        arrayWhereIn
      }
    })
  })

  return await Promise.all(getDataToVerify)
}

const verifyTable = async ({ body, buildQuery, system, throwErrorMessage }) => {
  const tablesToVerify = [
    {
      modelName: 'usuario',
      bodyKey: 'usuarioIntelisis',
      keyIntelisis: 'usuario',
      verifyExistence: true
    },
    {
      modelName: 'personal',
      bodyKey: 'personalIntelisis',
      keyIntelisis: 'personal'
    },
    {
      modelName: 'agente',
      bodyKey: 'agenteIntelisis',
      keyIntelisis: 'agente'
    }
  ]

  const getDataToVerifyIntelisis = await verifyKeys({
    tablesToVerify,
    body,
    buildQuery,
    system
  })

  getDataToVerifyIntelisis.forEach((item) => {
    const { totalRecords = 0 } = item

    if (!totalRecords) {
      throwErrorMessage({
        name: 'recordNotExist',
        message: 'Favor de verificar los valores de intelisis'
      })
    }
  })
}

const registerUpdateUserApp = async ({ body, system }) => {
  const { operationCrud, utils, dependencies, buildQuery } = system
  const { throwErrorMessage, object } = utils
  const { security } = dependencies
  object.verifyArrayInObject({
    array: ['nombre', 'correo'],
    object: body
  })

  const { catalogData: userVerified } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCUsuario',
      addAllColumns: true,
      hasPagination: false,
      whereInParams: {
        correo: body.correo
      }
    }
  })

  if (userVerified.length >= 1) {
    throwErrorMessage({
      name: 'userRegistered',
      message: 'El usuario ya se encuentra registrado en la plataforma.'
    })
  }

  await verifyTable({ body, buildQuery, system, throwErrorMessage })

  const contrasenaArgon = await security.encrypt({
    password: body.contrasena
  })
  const uuidUser = security.generateKey({ lengthKey: 10 })
  const token = await security.jwtCreate({
    data: {
      usuario: uuidUser
    },
    expiresIn: activateAccount
  })

  const userInserted = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'create',
    dataQuery: {
      dataInsert: {
        ...body,
        contrasena: contrasenaArgon,
        usuario: uuidUser,
        claveToken: token,
        perfil: 'administrador',
        estatus: 'alta',
        usuarioIntelisis: 'CDRM'
      }
    }
  })

  return {
    ...userInserted
  }
}

const updateOneUserApp = async ({ body, system }) => {
  const { utils, buildQuery, operationCrud } = system
  const { throwErrorMessage, object } = utils

  object.verifyArrayInObject({
    array: ['nombre', 'correo', 'empresa'],
    object: body
  })

  await verifyTable({ body, buildQuery, system, throwErrorMessage })

  const { usuario = '', ...restDataBody } = body

  const updatedUser = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery: {
      dataUpdate: restDataBody,
      dataWhere: {
        usuario
      }
    }
  })

  if (!updatedUser) {
    throwErrorMessage({
      name: 'updateError',
      message: 'Error al actualizar el usuario'
    })
  }

  return {
    userUpdated: true,
    ...body
  }
}

const updateStatusUserApp = async ({ body, system }) => {
  const { utils, buildQuery, operationCrud } = system
  const { throwErrorMessage, object } = utils

  object.verifyArrayInObject({
    array: ['correo'],
    object: body
  })

  await verifyTable({ body, buildQuery, system, throwErrorMessage })

  const { correo = '' } = body

  const updatedStatusUser = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCUsuario,
    optionCrud: 'update',
    dataQuery: {
      dataUpdate: { estatus: 'baja' },
      dataWhere: {
        correo
      }
    }
  })

  if (!updatedStatusUser) {
    throwErrorMessage({
      name: 'updateError',
      message: 'No se encuentra el correo ingresado, valide sus datos ingresados'
    })
  }

  return {
    userStatus: true,
    ...body
  }
}

module.exports = {
  registerUpdateUserApp,
  updateOneUserApp,
  updateStatusUserApp
}
