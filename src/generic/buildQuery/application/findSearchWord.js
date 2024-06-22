const findSearchWord = ({
  currentModelName,
  crudModels = {},
  arrayWhereIn = [],
  throwErrorMessage,
  searchWord,
  arraySearch
}) => {
  let querySearch = ''
  if (searchWord && arraySearch.length) {
    querySearch = arraySearch.reduce((querySearch, column, arrayIndex) => {
      const { aliasName = '', modelName = '', columnValue = '' } = column
      const currentModel =
        aliasName ||
        crudModels[modelName]?.tableName ||
        currentModelName.tableName

      if (!currentModel) {
        throwErrorMessage({
          name: 'modelNotExist',
          message: 'El modelo de search no existe'
        })
      }

      if (!arrayIndex) {
        if (!arrayWhereIn.length) querySearch = 'WHERE'
        else querySearch = 'AND ('
      }

      // isNaN(searchWord) ? `'%${searchWord}%'` : `%${searchWord}%`
      const columnConditionTye = `'%${searchWord}%'`
      const whereCondition = `${currentModel}.${columnValue} LIKE ${columnConditionTye}`

      if (!arrayIndex) querySearch = `${querySearch} ${whereCondition}`
      querySearch = `${querySearch} OR ${whereCondition}`

      if (arrayIndex === arraySearch.length - 1 && arrayWhereIn.length) {
        querySearch = `${querySearch} )`
      }

      return querySearch
    }, '')
  }

  return querySearch
}

module.exports = findSearchWord
