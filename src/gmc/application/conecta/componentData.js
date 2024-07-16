const getComponentData = async ({ system, queryParams }) => {
  const { buildQuery, utils } = system
  const { throwErrorMessage } = utils
  const { usuario = '' } = queryParams

  if (!usuario) {
    throwErrorMessage({
      name: 'paramsRequired',
      message: 'El parámetro usuario es requerido'
    })
  }

  const { catalogData: businessPerUser } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCEmpresaUsuario',
      getFields: [
        {
          modelName: 'xpCovGMCEmpresa',
          columnValue: 'empresa'
        },
        {
          modelName: 'xpCovGMCEmpresa',
          columnValue: 'nombreE'
        }
      ],
      hasPagination: false,
      arrayWhereIn: [
        {
          modelName: 'xpCovGMCEmpresaUsuario',
          columnName: 'usuario',
          arrayConditions: [usuario]
        },
        {
          modelName: 'xpCovGMCEmpresa',
          columnName: 'estatus',
          arrayConditions: ['alta']
        },
        {
          modelName: 'xpCovGMCEmpresaUsuario',
          columnName: 'estatus',
          arrayConditions: ['alta']
        }
      ],
      arrayJoin: [
        {
          leftCondition: {
            modelName: 'xpCovGMCEmpresa',
            fieldName: 'idXpCovGMCEmpresa'
          },
          rightCondition: {
            modelName: 'xpCovGMCEmpresaUsuario',
            fieldName: 'idXpCovGMCEmpresa'
          }
        }
      ]
    }
  })

  const { catalogData: applicationsAvailable } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCAplicativo',
        addAllColumns: true,
        hasPagination: false,
        whereInParams: {
          estatus: 'alta'
        }
      }
    })

  const getKeysApplication = applicationsAvailable.map(
    (item) => item.aplicativo
  )

  let { catalogData: modulesPerApplication } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCModulo',
        addAllColumns: true,
        hasPagination: false,
        whereInParams: {
          estatus: 'alta'
        },
        arrayWhereIn: [
          {
            modelName: 'xpCovGMCModulo',
            columnName: 'aplicativo',
            arrayConditions: getKeysApplication
          }
        ]
      }
    })

  modulesPerApplication = modulesPerApplication.reduce((acum, item) => {
    const { aplicativo = '' } = item
    const verifyApp = acum[aplicativo] || []

    acum = {
      ...acum,
      [aplicativo]: [...verifyApp, item]
    }

    return acum
  }, {})

  return {
    businessPerUser,
    applicationsAvailable,
    modulesPerApplication
  }
}

const getComponentDataUser = async ({ system, params }) => {
  const { buildQuery, utils } = system
  const { throwErrorMessage } = utils
  const {
    ketTable = 'modulo',
    keyTableValue = '',
    idXpCovGMCEmpresaUsuario = ''
  } = params

  if (!ketTable || !keyTableValue || !idXpCovGMCEmpresaUsuario) {
    throwErrorMessage({
      name: 'paramRequired',
      message:
        'El parámetro ketTable, keyTableValue e idXpCovGMCEmpresaUsuario son requeridos'
    })
  }

  const { catalogData: allComponents } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCModulo',
      getFields: [
        {
          modelName: 'xpCovGMCModulo',
          columnValue: 'modulo'
        },
        {
          modelName: 'xpCovGMCComponente',
          columnValue: 'componente'
        },
        {
          modelName: 'xpCovGMCComponente',
          columnValue: 'descripcionC'
        },
        {
          modelName: 'xpCovGMCComponente',
          columnValue: 'idXpCovGMCComponente'
        }
      ],
      hasPagination: false,
      arrayWhereIn: [
        {
          modelName: 'xpCovGMCModulo',
          columnName: ketTable,
          arrayConditions: [keyTableValue]
        },
        {
          modelName: 'xpCovGMCComponente',
          columnName: 'estatus',
          arrayConditions: ['alta']
        }
      ],
      arrayJoin: [
        {
          leftCondition: {
            modelName: 'xpCovGMCComponente',
            fieldName: 'idXpCovGMCModulo'
          },
          rightCondition: {
            modelName: 'xpCovGMCModulo',
            fieldName: 'idXpCovGMCModulo'
          }
        }
      ]
    }
  })

  const keyComponents = allComponents.map((item) => item.idXpCovGMCComponente)

  const { catalogData: getUserComponents } = await buildQuery.dynamicBuildQuery(
    {
      system,
      body: {
        modelName: 'xpCovGMCEmpresaUsuarioComponente',
        addAllColumns: true,
        hasPagination: false,
        arrayWhereIn: [
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnName: 'estatus',
            arrayConditions: ['alta']
          },
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnName: 'idXpCovGMCEmpresaUsuario',
            arrayConditions: [idXpCovGMCEmpresaUsuario]
          },
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnName: 'idXpCovGMCComponente',
            arrayConditions: keyComponents
          }
        ]
      }
    }
  )

  const userComponents = allComponents.reduce((acum, component) => {
    const { idXpCovGMCComponente = 0 } = component

    const findComponentIndex = getUserComponents.findIndex(
      (item) => item.idXpCovGMCComponente === idXpCovGMCComponente
    )

    if (findComponentIndex !== -1) {
      acum = [
        ...acum,
        { ...component, ...getUserComponents[findComponentIndex] }
      ]
    }

    if (ketTable === 'modulo' && findComponentIndex === -1) acum = [...acum, component]

    return acum
  }, [])

  return userComponents
}

module.exports = {
  getComponentData,
  getComponentDataUser
}
