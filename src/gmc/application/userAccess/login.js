// const { completeCatalogs } = require('../../../commons/catalogsToLoad')
const { loginTimeJwt, refreshTokenTimeJwt } = require('../../../constants')
// const { gmcModelsApp } = completeCatalogs
// const { dateFormat } = require('../../../infrastructure/dependencies')

const logIn = async ({ body, system }) => {
  const { utils, dependencies, buildQuery } = system
  const { throwErrorMessage, object } = utils
  const { security } = dependencies
  // select * from [xpCovGMCEmpresaUsuarioComponente] where IdXpCovGMCEmpresaUsuario = 21 and IdXpCovGMCComponente= 12 and Estatus='alta'

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
      message: 'Para ingresar a la plataforma, activa tu cuenta primero.'
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

  const { catalogData: getBusiness } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCEmpresaUsuario',
      addAllColumns: true,
      hasPagination: false,
      whereInParams: {
        estatus: 'alta',
        usuario: user.usuario
      }
    }
  })

  if (!getBusiness.length) {
    throwErrorMessage({
      name: 'noBusiness',
      message:
        'El usuario esta dado de baja o no cuentas con empresas asignadas.'
    })
  }

  const getBusinessUserKeys = getBusiness.map(
    (item) => item.idXpCovGMCEmpresaUsuario
  )

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
            columnName: 'idXpCovGMCEmpresaUsuario',
            arrayConditions: getBusinessUserKeys
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

  // const currentDate = dateFormat.getDateFormat({
  //   date: new Date(),
  //   formatDate: 'y-MM-dd HH:mm:ss'
  // })

  // const [sesionExist] = await operationCrud({
  //   optionCrud: 'read',
  //   tableName: gmcModelsApp.xpCovGMCSesiones,
  //   dataQuery: {
  //     dataSelect: ['token'],
  //     dataWhere: {
  //       usuario: user.usuario
  //     }
  //   }
  // })

  // if (!sesionExist) {
  //   await operationCrud({
  //     tableName: gmcModelsApp.xpCovGMCSesiones,
  //     optionCrud: 'create',
  //     dataQuery: {
  //       dataInsert: {
  //         usuario: user.usuario,
  //         sesionInicio: currentDate,
  //         ultimaActualizacion: currentDate,
  //         ip: body?.ip || '',
  //         token: jwtToken
  //       }
  //     }
  //   })
  // }
  const sesionExist = false
  return {
    jwtToken: sesionExist ? sesionExist.token : jwtToken,
    perfil: user.perfil,
    privilegio: user.privilegio,
    completeName: `${user.nombre} ${user.apellidoPaterno || ''}`,
    usuarioIntelisis: user.usuarioIntelisis,
    agenteIntelisis: user.agenteIntelisis,
    personalIntelisis: user.personalIntelisis,
    usuario: user.usuario,
    refreshToken
  }
}

module.exports = {
  logIn
}
