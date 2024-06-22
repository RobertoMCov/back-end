const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { loginTimeJwt, refreshTokenTimeJwt } = require('../../../constants')
const { gmcModelsApp } = completeCatalogs
const { dateFormat } = require('../../../infrastructure/dependencies')

const logInApp = async ({ body, system }) => {
  const { operationCrud, utils, dependencies, buildQuery } = system
  const { throwErrorMessage, object } = utils
  const { security } = dependencies

  object.verifyArrayInObject({
    array: ['correo', 'contrasena'],
    object: body
  })

  const getUser = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCUsuario',
      addAllColumns: true,
      hasPagination: false,
      arrayWhereIn: [
        {
          modelName: 'xpCovGMCUsuario',
          columnName: 'correo',
          arrayConditions: [body.correo]
        }
      ]
    }
  })

  if (!getUser.totalRecords) {
    throwErrorMessage({
      name: 'userNotFound',
      message: 'EL usuario no existe dentro de la plataforma.'
    })
  }

  const user = getUser.catalogData[0]

  if (user.estatus !== 'alta') {
    throwErrorMessage({
      name: 'statusNotAllowed',
      message: 'Datos de cuenta no existen ó no coinciden ó dada de baja, valida tus datos'
    })
  }

  const passwordCorrect = await security.encryptVerify({
    valueEncrypt: user.contrasena,
    unEncryptedValue: body.contrasena
  })

  if (!passwordCorrect) {
    throwErrorMessage({
      name: 'passwordIncorrect',
      message: 'La contraseña no es correcta.'
    })
  }

  const jwtToken = await security.jwtCreate({
    data: {
      usuario: user.usuario,
      perfil: user.perfil,
      usuarioIntelisis: user.usuarioIntelisis
    },
    expiresIn: loginTimeJwt
  })

  const refreshToken = await security.jwtCreate({
    data: {
      usuario: user.usuario,
      perfil: user.perfil,
      usuarioIntelisis: user.usuarioIntelisis
    },
    expiresIn: refreshTokenTimeJwt
  })

  const { catalogData: getUserComponents } = await buildQuery.dynamicBuildQuery(
    {
      system,
      body: {
        modelName: 'xpCovGMCEmpresaUsuarioComponente',
        addAllColumns: true,
        hasPagination: false,
        arrayJoin: [
          {
            leftCondition: {
              modelName: 'xpCovGMCComponente',
              fieldName: 'idXpCovGMCComponente'
            },
            rightCondition: {
              modelName: 'xpCovGMCEmpresaUsuarioComponente',
              fieldName: 'idXpCovGMCComponente'
            }
          }
        ],
        arrayWhereIn: [
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnName: 'estatus',
            arrayConditions: ['alta']
          },
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnName: 'idXpCovGMCEmpresaUsuario'
            // arrayConditions: getBusinessUserKeys
          }
        ]
      }
    }
  )

  if (!getUserComponents.length) {
    throwErrorMessage({
      name: 'noComponents',
      message: 'No cuentas con componentes asignados'
    })
  }

  const { catalogData: verifySession } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCSesiones',
      addAllColumns: true,
      hasPagination: false,
      whereInParams: {
        usuario: user.usuario
      }
    }
  })

  if (!verifySession.length) {
    const currentDate = dateFormat.getDateFormat({
      date: new Date(),
      formatDate: 'y-MM-dd HH:mm:ss'
    })

    await operationCrud({
      tableName: gmcModelsApp.xpCovGMCSesiones,
      optionCrud: 'create',
      dataQuery: {
        dataInsert: {
          usuario: user.usuario,
          sesionInicio: currentDate,
          ultimaActualizacion: currentDate,
          ip: body?.ip || '',
          token: jwtToken
        }
      }
    })
  }

  return {
    jwtToken,
    perfil: user.perfil,
    completeName: `${user.nombre} ${user.apellidoPaterno || ''}`,
    usuarioIntelisis: user.usuarioIntelisis,
    agenteIntelisis: user.agenteIntelisis,
    usuario: user.usuario,
    refreshToken
  }
}

module.exports = {
  logInApp
}
