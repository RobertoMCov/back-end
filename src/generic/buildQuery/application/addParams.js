const addParams = ({ modelName = '', columnParams = [], addAllColumns = false, currentModelName, throwErrorMessage, whereInParams }) => {
  const allColumnsCurrentModel = [...currentModelName.columns, currentModelName.idTable]

  let concatFieldsParams = []
  let arrayWhereInParams = []

  columnParams.forEach((column) => {
    if (
      !allColumnsCurrentModel.includes(column)
    ) {
      throwErrorMessage({
        name: 'fieldError',
        message: `El campo ${column} no existe en el modelo`
      })
    }
  })

  if (!addAllColumns && columnParams.length) {
    concatFieldsParams = columnParams.map((column) => ({ columnValue: column }))
  }

  if (Object.keys(whereInParams).length) {
    for (const keyParam in whereInParams) {
      if (
        !allColumnsCurrentModel.includes(keyParam)
      ) {
        throwErrorMessage({
          name: 'fieldError',
          message: `El campo ${keyParam} no existe en el modelo`
        })
      }

      const getCondition = !isNaN(whereInParams[keyParam]) ? [whereInParams[keyParam]] : whereInParams[keyParam]?.split('||') || []

      arrayWhereInParams = [...arrayWhereInParams, {
        modelName,
        arrayConditions: getCondition,
        columnName: keyParam
      }]
    }
  }

  return { concatFieldsParams, arrayWhereInParams }
}

module.exports = addParams
