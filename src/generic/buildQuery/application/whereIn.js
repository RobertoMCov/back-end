const whereInCondition = ({
  currentModelName,
  crudModels,
  arrayWhereIn,
  throwErrorMessage,
  arrayToken,
  locals
}) => {
  const clearArrayWhereIn = arrayWhereIn.reduce((acum, item) => {
    const { arrayConditions = [] } = item
    if (arrayConditions.length) acum = [...acum, item]
    return acum
  }, [])

  let queryWhereIn = clearArrayWhereIn.reduce((acum, whereCondition, index) => {
    let {
      modelName = '',
      aliasName = '',
      columnName = '',
      whereRule = 'in',
      hasNot = false,
      arrayConditions = [],
      conditionSymbol = '',
      conditionValue = ''
    } = whereCondition
    let currentColumn = ''

    const aliasColumnName =
      aliasName ||
      crudModels[modelName].tableName ||
      currentModelName.tableName
    currentColumn = `${aliasColumnName}.${columnName}`

    if (!acum) acum = 'WHERE'

    if (!aliasColumnName) {
      throwErrorMessage({
        name: 'modelNotExist',
        message: 'El modelo no existe'
      })
    }

    if (whereRule === 'in') {
      arrayConditions = arrayConditions.map((condition) => `'${condition}'`)

      if (index === 0) {
        acum = `${acum} ${currentColumn} ${
          hasNot ? 'NOT' : ''
        } IN (${arrayConditions.join(',')})`
      } else {
        acum = `${acum} AND ${currentColumn} ${
          hasNot ? 'NOT' : ''
        } IN (${arrayConditions.join(',')})`
      }
    }

    if (whereRule === 'condition') {
      if (index === 0) {
        acum = `${acum} ${currentColumn} ${
          hasNot ? 'NOT' : ''
        } ${conditionSymbol} ${conditionValue}`
      } else {
        acum = `${acum} AND ${currentColumn} ${
          hasNot ? 'NOT' : ''
        } ${conditionSymbol} ${conditionValue}`
      }
    }

    return acum
  }, '')

  queryWhereIn = arrayToken.reduce((queryWhereIn, columnToken, index) => {
    const {
      columnName = '',
      tokenName = '',
      variableType = 'string'
    } = columnToken

    const columnTypeCondition =
      variableType === 'string' ? `'${locals[tokenName]}'` : locals[tokenName]

    if (!queryWhereIn && index === 0) {
      queryWhereIn = `WHERE ${columnName} IN (${columnTypeCondition})`
    } else {
      queryWhereIn = `${queryWhereIn} AND ${columnName} IN (${columnTypeCondition})`
    }

    return queryWhereIn
  }, queryWhereIn)

  return queryWhereIn
}

module.exports = whereInCondition
