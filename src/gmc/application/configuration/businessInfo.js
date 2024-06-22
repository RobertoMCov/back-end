const getBusinessUser = async ({ query, system }) => {
  const { buildQuery } = system
  const { usuario } = query

  const { catalogData: allBusiness } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCEmpresa',
      columnParams: ['nombreE', 'empresa'],
      hasPagination: false,
      whereInParams: {
        estatus: 'alta'
      }
    }
  })

  const { catalogData: businessUser } = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'xpCovGMCEmpresa',
      hasPagination: false,
      whereInParams: {
        estatus: 'alta'
      },
      arrayJoin: [
        {
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
      getFields: [
        {
          modelName: 'xpCovGMCEmpresaUsuario',
          columnValue: 'idXpCovGMCEmpresaUsuario'
        },
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
          columnValue: 'estatus'
        }
      ],
      arrayWhereIn: [
        {
          modelName: 'xpCovGMCEmpresaUsuario',
          columnName: 'Usuario',
          arrayConditions: [usuario]
        }
      ]
    }
  })

  const userBusiness = allBusiness.map((business) => {
    const { idXpCovGMCEmpresa = 0 } = business

    const findBusinessIndex = businessUser.findIndex(
      (item) => item.idXpCovGMCEmpresa === idXpCovGMCEmpresa
    )

    if (findBusinessIndex !== -1) return businessUser[findBusinessIndex]
    return business
  })

  return userBusiness
}

module.exports = {
  getBusinessUser
}
