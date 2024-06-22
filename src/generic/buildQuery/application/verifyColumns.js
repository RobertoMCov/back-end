const verifyColumns = ({
  getFields,
  addAllColumns,
  mainModel,
  concatFields,
  crudModels,
  throwErrorMessage
}) => {
  let getNotRepeatedFields = []

  if (addAllColumns) {
    const filterGetFields = getFields.filter((column) => column?.modelName === mainModel.tableName)
    const verifyGetFields = filterGetFields.map((item) => item.columnValue)

    getNotRepeatedFields = mainModel.columns.reduce(
      (getNotRepeatedFields, columnName) => {
        if (!verifyGetFields.includes(columnName)) {
          getNotRepeatedFields = [
            ...getNotRepeatedFields,
            { columnValue: columnName }
          ]
        }
        return getNotRepeatedFields
      },
      []
    )

    concatFields = [...getNotRepeatedFields]
  }

  if (getFields.length) {
    getFields.forEach((column) => {
      const {
        columnType = 'column',
        columnValue = '',
        modelName = ''
      } = column
      const verifyModel = modelName ? crudModels[modelName] : mainModel
      const allColumns = [...verifyModel.columns, verifyModel.idTable]

      if (
        columnType === 'column' &&
        !allColumns.includes(columnValue)
      ) {
        throwErrorMessage({
          name: 'fieldError',
          message: `El campo ${columnValue} no existe en el modelo`
        })
      }
    })
  }

  concatFields = [...concatFields, ...getFields]

  return concatFields
}

module.exports = verifyColumns
