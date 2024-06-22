const getInfoSelectAppBranchOffice = async ({
  tokenInfo,
  system,
  query = {}
}) => {
  const { utils, buildQuery } = system
  const { throwErrorMessage } = utils

  let getCurrentApp = []
  let getCurrentBranchOffices = []
  const whereInBrachOffice = { estatus: 'alta' }
  const { usuario } = tokenInfo
  const { empresa = '' } = query

  if (!usuario) {
    throwErrorMessage({
      name: 'infoRequired',
      message: 'El campo de usuario es requerido'
    })
  }

  // Valores por default para la sucursal
  const { catalogData: configBranchOffice } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        hasPagination: false,
        addAllColumns: true,
        modelName: 'xpCovGMCConfiguracion',
        whereInParams: {
          modulo: 'configSucursal'
        }
      }
    })

  // if (!configBranchOffice.length) {
  //   throwErrorMessage({
  //     name: 'withoutConfig',
  //     message:
  //       'Favor de verificar las configuraciones del aplicativo sucursalUsuario y sucursalRequerida'
  //   })
  // }

  const { valor: sucursalUsuario = '' } = configBranchOffice.find(
    (item) => item.parametro === 'sucursalUsuario'
  ) || {}
  const { valor: sucursalRequerida = '' } = configBranchOffice.find(
    (item) => item.parametro === 'sucursalRequerida'
  ) || {}

  // if (!sucursalUsuario || !sucursalRequerida) {
  //   throwErrorMessage({
  //     name: 'withoutConfigFlag',
  //     message:
  //       'Se requieren las configuraciones de scursalRequerida o sursalRequerida la aplicación'
  //   })
  // }

  // Todas las sucursales o las del usuario
  if (sucursalUsuario === 'alta') {
    const { catalogData: userInfo } = await buildQuery.dynamicBuildQuery({
      system,
      body: {
        hasPagination: false,
        addAllColumns: true,
        modelName: 'xpCovGMCUsuario',
        whereInParams: {
          usuario
        }
      }
    })
    const { agenteIntelisis, perfil } = userInfo[0]

    if (perfil !== 'master') {
      const { catalogData: branchOfficeAgent } =
        await buildQuery.dynamicBuildQuery({
          system,
          body: {
            hasPagination: false,
            addAllColumns: true,
            modelName: 'agente',
            whereInParams: {
              agente: agenteIntelisis
            }
          }
        })
      const { sucursalEmpresa = '' } = branchOfficeAgent[0] || {}
      const verifyBranchOfficeBusiness = isNaN(sucursalEmpresa)
        ? !sucursalEmpresa
        : false

      if (verifyBranchOfficeBusiness) {
        throwErrorMessage({
          name: 'agentNotAvailable',
          message: 'No se encontró dicho agente'
        })
      }

      whereInBrachOffice.sucursal = sucursalEmpresa
    }
  }

  const { catalogData: allBranchOffices } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      hasPagination: false,
      modelName: 'xpCovGMCSucursal',
      columnParams: ['sucursal', 'nombreS'],
      whereInParams: whereInBrachOffice
    }
  })

  getCurrentBranchOffices = allBranchOffices

  // Empresas (keys) del usuario
  const { catalogData: getBusinessModules } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCEmpresaUsuarioComponente',
        hasPagination: false,
        getFields: [
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnValue: 'idXpCovGMCEmpresaUsuario'
          },
          {
            modelName: 'xpCovGMCEmpresaUsuarioComponente',
            columnValue: 'idXpCovGMCComponente'
          }
        ],
        arrayJoin: [
          {
            leftCondition: {
              modelName: 'xpCovGMCEmpresaUsuario',
              fieldName: 'idXpCovGMCEmpresaUsuario'
            },
            rightCondition: {
              modelName: 'xpCovGMCEmpresaUsuarioComponente',
              fieldName: 'idXpCovGMCEmpresaUsuario'
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
            modelName: 'xpCovGMCEmpresaUsuario',
            columnName: 'estatus',
            arrayConditions: ['alta']
          },
          {
            modelName: 'xpCovGMCEmpresaUsuario',
            columnName: 'usuario',
            arrayConditions: [usuario]
          }
        ]
      }
    })

  let getBusinessKeys = getBusinessModules.map(
    (item) => item.idXpCovGMCEmpresaUsuario
  )
  getBusinessKeys = [...new Set(getBusinessKeys)]

  if (!getBusinessKeys.length) {
    return {
      getCurrentBusiness: [],
      getCurrentApp: [],
      getCurrentBranchOffices
    }
  }

  const { catalogData: getCurrentBusiness } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCEmpresa',
        hasPagination: false,
        getFields: [
          {
            modelName: 'xpCovGMCEmpresa',
            columnValue: 'empresa'
          },
          {
            modelName: 'xpCovGMCEmpresa',
            columnValue: 'nombreE'
          },
          {
            modelName: 'xpCovGMCEmpresaUsuario',
            columnValue: 'idXpCovGMCEmpresaUsuario'
          }
        ],
        arrayJoin: [
          {
            joinCondition: 'RIGHT',
            leftCondition: {
              modelName: 'xpCovGMCEmpresaUsuario',
              fieldName: 'idXpCovGMCEmpresa'
            },
            rightCondition: {
              modelName: 'xpCovGMCEmpresa',
              fieldName: 'idXpCovGMCEmpresa'
            }
          }
        ],
        arrayWhereIn: [
          {
            modelName: 'xpCovGMCEmpresaUsuario',
            columnName: 'estatus',
            arrayConditions: ['alta']
          },
          {
            modelName: 'xpCovGMCEmpresa',
            columnName: 'estatus',
            arrayConditions: ['alta']
          },
          {
            modelName: 'xpCovGMCEmpresaUsuario',
            columnName: 'idXpCovGMCEmpresaUsuario',
            arrayConditions: getBusinessKeys
          }
        ]
      }
    })

  // Nombre de las empresas del usuario
  if (empresa) {
    const findBusiness = getCurrentBusiness.find(
      (item) => item.empresa === empresa
    )

    if (findBusiness) {
      const { idXpCovGMCEmpresaUsuario } = findBusiness
      const getBusinessComponents = getBusinessModules.filter(
        (item) => item.idXpCovGMCEmpresaUsuario === idXpCovGMCEmpresaUsuario
      )
      let getComponentKeys = getBusinessComponents.map(
        (item) => item.idXpCovGMCComponente
      )
      getComponentKeys = [...new Set(getComponentKeys)]

      const { catalogData: getCurrentAppUser } =
        await buildQuery.dynamicBuildQuery({
          system,
          body: {
            modelName: 'xpCovGMCAplicativo',
            hasPagination: false,
            getFields: [
              {
                modelName: 'xpCovGMCAplicativo',
                columnValue: 'descripcionA'
              }
            ],
            arrayJoin: [
              {
                leftCondition: {
                  modelName: 'xpCovGMCModulo',
                  fieldName: 'aplicativo'
                },
                rightCondition: {
                  modelName: 'xpCovGMCAplicativo',
                  fieldName: 'aplicativo'
                }
              },
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
            ],
            arrayWhereIn: [
              {
                modelName: 'xpCovGMCAplicativo',
                columnName: 'estatus',
                arrayConditions: ['alta']
              },
              {
                modelName: 'xpCovGMCAplicativo',
                columnName: 'tipoAplicativo',
                arrayConditions: ['web']
              },
              {
                modelName: 'xpCovGMCModulo',
                columnName: 'estatus',
                arrayConditions: ['alta']
              },
              {
                modelName: 'xpCovGMCComponente',
                columnName: 'idXpCovGMCComponente',
                arrayConditions: getComponentKeys
              }
            ]
          }
        })

      const filterApps = getCurrentAppUser.reduce(
        (acum, app) => {
          const { aplicativo = '' } = app

          if (!acum.appKeys.includes(aplicativo)) {
            acum.appKeys = [...acum.appKeys, aplicativo]
            acum.currentApp = [...acum.currentApp, app]
          }

          return acum
        },
        {
          appKeys: [],
          currentApp: []
        }
      )
      getCurrentApp = filterApps.currentApp
    }
  }

  return {
    getCurrentBusiness,
    getCurrentApp,
    getCurrentBranchOffices,
    sucursalRequerida: sucursalRequerida === 'alta'
  }
}

module.exports = {
  getInfoSelectAppBranchOffice
}
