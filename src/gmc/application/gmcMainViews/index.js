const getBusinessPlatform = async ({ system }) => {
  const { buildQuery } = system

  const { catalogData: getPlatformBusiness } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCEmpresa',
        addAllColumns: true,
        hasPagination: false,
        arrayWhereIn: [
          {
            modelName: 'xpCovGMCEmpresa',
            columnName: 'empresa',
            arrayConditions: ['master'],
            hasNot: true
          }
        ]
      }
    })

  const getBusinessKeys = getPlatformBusiness.map(
    (business) => business.empresa
  )

  const { catalogData: getIntelisisBusiness } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'empresa',
        addAllColumns: true,
        hasPagination: false,
        arrayWhereIn: [
          {
            modelName: 'empresa',
            columnName: 'empresa',
            arrayConditions: getBusinessKeys,
            hasNot: true
          }
        ]
      }
    })

  const normalizeIntBusiness = getIntelisisBusiness.map((business) => {
    const { nombre = '' } = business
    return {
      ...business,
      nombreE: nombre
    }
  })

  const allBusiness = [...getPlatformBusiness, ...normalizeIntBusiness]

  return allBusiness
}

const getBranchOfficePlatform = async ({ system }) => {
  const { buildQuery } = system

  const { catalogData: getPlatformBranchOffices } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'xpCovGMCSucursal',
        addAllColumns: true,
        hasPagination: false
      }
    })

  const getBranchOfficesKeys = getPlatformBranchOffices.map(
    (business) => business.sucursal
  )

  const { catalogData: getIntelisisBranchOffices } =
    await buildQuery.dynamicBuildQuery({
      system,
      body: {
        modelName: 'sucursal',
        addAllColumns: true,
        hasPagination: false,
        arrayWhereIn: [
          {
            modelName: 'sucursal',
            columnName: 'sucursal',
            arrayConditions: getBranchOfficesKeys,
            hasNot: true
          }
        ]
      }
    })

  const normalizeIntBusiness = getIntelisisBranchOffices.map((branchOffice) => {
    const { nombre = '' } = branchOffice
    return {
      ...branchOffice,
      nombreS: nombre
    }
  })

  const allBusiness = [...getPlatformBranchOffices, ...normalizeIntBusiness]

  return allBusiness
}

module.exports = {
  getBusinessPlatform,
  getBranchOfficePlatform
}
