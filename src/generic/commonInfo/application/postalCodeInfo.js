const getPostalCode = async ({ params, system }) => {
  const { buildQuery, utils } = system
  const { codigoPostal = '' } = params
  const { throwErrorMessage } = utils

  if (codigoPostal.length !== 5) {
    throwErrorMessage({
      name: 'postalCodeError',
      message: 'Ingrese un código postal de 5 caracteres'
    })
  }

  const detailPostalCode = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: 'codigoPostal',
      addAllColumns: true,
      hasPagination: false,
      arrayWhereIn: [
        {
          modelName: 'codigoPostal',
          columnName: 'codigoPostal',
          arrayConditions: [codigoPostal]
        }
      ]
    }
  })

  if (!detailPostalCode.catalogData.length) {
    throwErrorMessage({
      name: 'postalCodeError',
      message: 'No existe un código postal con dicho código'
    })
  }

  const {
    codigoPostal: postalCode,
    estado = '',
    delegacion = ''
  } = detailPostalCode.catalogData[0]

  return {
    codigoPostal: postalCode,
    estado,
    delegacion,
    colonias: detailPostalCode.catalogData.map((postalCodeItem) => {
      return {
        coloniaAsentamiento: postalCodeItem.colonia,
        nombreColonia: postalCodeItem.colonia
      }
    })
  }
}

module.exports = {
  getPostalCode
}
