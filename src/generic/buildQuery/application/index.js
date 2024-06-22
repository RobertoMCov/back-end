const objModels = require('../../../commons/catalogsToLoad')
const { allCatalogs: crudModels } = objModels
const envVariables = require('../../../environment')
const readDataBase = require('../../../commons/readDataBase')

const whereInCondition = require('./whereIn')
const verifyColumns = require('./verifyColumns')
const buildJoin = require('./buildJoin')
const findSearchWord = require('./findSearchWord')
const addParams = require('./addParams')

const dynamicBuildQuery = async ({ system, body, locals = {} }) => {
  const { utils, operationCrud } = system
  const { throwErrorMessage } = utils
  let queryTop = ''
  let queryWhereIn = ''
  let concatFields = []
  let queryJoin = ''
  let querySearch = ''
  let queryPagination = ''
  let objNextPage = {}
  let currentDataBase = {}
  let paginationCondition = false
  let allWhereIn = []
  let queryDates = ''
  let queryOrderBy = ''
  let currentOrderByOptions = []

  const {
    modelName = '',
    addAllColumns = false,
    getFields = [],
    externalQueryColumns = '',
    topSelect = 0,
    arrayWhereIn = [],
    arrayJoin = [],
    hasPagination = true,
    page = 1,
    numberOfItems = 10,
    arrayToken = [],
    columnParams = [],
    whereInParams = {},
    initialDate = '',
    dateColumnName = 'fechaRegistro',
    finalDate = '',
    searchWord = '',
    arraySearch = [],
    orderBy = [{ column: 'fechaRegistro', order: 'DESC' }],
    orderByOption = 'ASC',
    orderByParams = ''
  } = body

  paginationCondition = hasPagination
  allWhereIn = [...arrayWhereIn]

  currentDataBase = await readDataBase({
    currentDataBase,
    system
  })

  const currentModelName = crudModels[modelName]

  if (!currentModelName) {
    throwErrorMessage({
      name: 'modelNotExist',
      message: 'El modelo no existe'
    })
  }

  if (currentModelName?.authorizationRequired) {
    throwErrorMessage({
      name: 'accessDenied',
      message: `No es posible acceder al modelo ${modelName}`
    })
  }

  if (arrayJoin.length) {
    queryJoin = buildJoin({
      throwErrorMessage,
      arrayJoin,
      crudModels,
      envVariables,
      currentDataBase
    })
  }

  // Campos del select respecto al modelo
  if (getFields.length || addAllColumns) {
    concatFields = verifyColumns({
      getFields,
      addAllColumns,
      mainModel: currentModelName,
      concatFields,
      crudModels,
      throwErrorMessage
    })
  }

  const { concatFieldsParams, arrayWhereInParams } = addParams({
    modelName,
    columnParams,
    currentModelName,
    throwErrorMessage,
    addAllColumns,
    whereInParams
  })

  concatFields = [...concatFields, ...concatFieldsParams]
  allWhereIn = [...allWhereIn, ...arrayWhereInParams]

  // Si existe un alias y espacios para cada campo
  concatFields = concatFields.map((column) => {
    const {
      columnType = 'column',
      columnValue = '',
      modelName = '',
      asName = '',
      hasNotSpaces = false,
      aliasName = ''
    } = column
    const currentColumn = `${aliasName || modelName || currentModelName.tableName
      }.${columnValue}`
    const removeSpaces = hasNotSpaces
      ? `RTRIM(LTRIM(${currentColumn}))`
      : currentColumn

    if (columnType === 'column') {
      return `${removeSpaces} ${asName ? `AS ${asName}` : ''}`
    } else return columnValue
  })

  concatFields = [
    ...concatFields,
    `${currentModelName.tableName}.${currentModelName.idTable}`
  ]
  // Si existe un top
  if (topSelect) {
    queryTop = `TOP ${topSelect}`
    paginationCondition = false
  }

  // Si tiene condiciones en el where
  if (allWhereIn.length || arrayToken.length) {
    queryWhereIn = whereInCondition({
      currentModelName,
      arrayWhereIn: allWhereIn,
      crudModels,
      throwErrorMessage,
      arrayToken,
      locals
    })
  }

  if (searchWord && arraySearch.length) {
    querySearch = findSearchWord({
      currentModelName,
      crudModels,
      arrayWhereIn: allWhereIn,
      throwErrorMessage,
      searchWord,
      arraySearch
    })
  }

  // Buscar por fechas
  if (initialDate || finalDate) {
    if (!arrayWhereIn.length || (searchWord && arraySearch.length)) { queryDates = 'WHERE' } else queryDates = 'AND'

    const convertDate = `CONVERT(varchar, ${dateColumnName}, 23)`

    if (initialDate && !finalDate) { queryDates = `${queryDates} ${convertDate} = '${initialDate}'` } else if (!initialDate && finalDate) {
      throwErrorMessage({
        name: 'withoutInitialDate',
        message: 'Favor de agregar el campo initialDate'
      })
    }
    if (initialDate && finalDate) { queryDates = `${queryDates} ${convertDate} BETWEEN '${initialDate}' AND '${finalDate}'` }
  }

  const queryWhereComplete = `
  ${queryJoin}
  ${queryWhereIn} ${querySearch} ${queryDates}
  `

  const totalRecords = `
  SELECT COUNT(${currentModelName.tableName}.${currentModelName.idTable}) AS totalRecords
  FROM ${currentModelName.tableName} ${currentModelName.tableName}
  ${queryWhereComplete}
  `

  const getTotalRecords = await operationCrud({
    tableName: currentModelName,
    optionCrud: 'useQuery',
    dataQuery: {
      query: `${totalRecords}`,
      internalError: true
    }
  })

  if (getTotalRecords.length === 1) {
    const { error = '', message = '' } = getTotalRecords[0] || {}

    if (error) {
      utils.throwErrorMessage({
        name: 'totalRecordsError',
        message
      })
    }
  }

  getTotalRecords.pop()
  const totalRecordsNumber = getTotalRecords[0].totalRecords

  if (paginationCondition && page) {
    if (page * numberOfItems > totalRecordsNumber) {
      objNextPage = {
        currentPage: parseInt(totalRecordsNumber / numberOfItems) + 1,
        nextPage: null
      }
    } else objNextPage = { currentPage: page, nextPage: page + 1 }

    const orderByCondition = `${currentModelName.tableName}.${currentModelName.idTable} ${orderByOption}`

    queryPagination = `
    ORDER BY ${orderByCondition}
    OFFSET ${objNextPage.currentPage * numberOfItems - numberOfItems} ROWS
    FETCH NEXT ${numberOfItems} ROWS ONLY
    `
  }

  // Order By
  const orderByOptions = orderByParams ? orderByParams.split('||') : []

  if (orderByOptions.length) currentOrderByOptions = orderByOptions.map((item) => ({ column: item }))
  else if (orderBy.length) currentOrderByOptions = [...orderBy]

  queryOrderBy = currentOrderByOptions.reduce((acum, item, index) => {
    const { column = '' } = item
    if (column && currentModelName.columns.includes(column)) {
      if (index === 0) { acum = `ORDER BY ${currentModelName.tableName}.${column}` } else acum = `${acum}, ${currentModelName.tableName}.${column}`

      if (index === (currentOrderByOptions.length - 1)) acum = `${acum} ${orderByOption}`
    }
    return acum
  }, '')

  const sqlQuery = `
  SELECT ${queryTop} ${concatFields.join(',')} 
  ${externalQueryColumns ? `,${externalQueryColumns}` : ''}
  FROM ${currentModelName.tableName} ${currentModelName.tableName}
  ${queryWhereComplete}
  ${hasPagination ? queryPagination : queryOrderBy}
  `
  const catalogData = await operationCrud({
    tableName: currentModelName,
    optionCrud: 'useQuery',
    dataQuery: {
      query: `${sqlQuery}`,
      internalError: true
    }
  })

  catalogData.pop()

  return {
    catalogData,
    totalRecords: totalRecordsNumber,
    ...objNextPage
  }
}

module.exports = {
  dynamicBuildQuery
}
