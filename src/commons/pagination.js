const getWhereIn = ({
  queryParams = {},
  arrayWhereIn,
  objTable,
  keyWord,
  fieldsToSearchByKeyWord
}) => {
  let arrayWhereInJoin = []
  const keysModel = objTable.columnNames?.map((column) => column.columnName) || []

  const whereInQueryParams = Object.keys(queryParams).reduce(
    (acum, paramKey) => {
      if ([...new Set([objTable.idTable, ...keysModel])].includes(paramKey) && queryParams[paramKey]) {
        acum = [...acum, [paramKey, queryParams[paramKey].split('|')]]
      }
      return acum
    },
    []
  )

  arrayWhereInJoin = [
    ...arrayWhereInJoin,
    ...arrayWhereIn,
    ...whereInQueryParams
  ]

  const likeValues = keyWord
    ? fieldsToSearchByKeyWord.map((value) => ({ field: value, value: keyWord }))
    : []

  return { arrayWhereInJoin, likeValues }
}

const getStartEndValuesPagination = ({
  pageSelected = 1,
  totalRecords = 0,
  totalRecordsByPage = 10
}) => {
  const totalPages = Math.ceil(totalRecords / totalRecordsByPage)

  let start =
    pageSelected > totalPages
      ? (totalPages - 1) * totalRecordsByPage
      : (pageSelected - 1) * totalRecordsByPage
  if (!totalRecords) start = 0
  const end =
    pageSelected >= totalPages
      ? totalRecords
      : pageSelected * totalRecordsByPage

  return { totalPages, pageSelected, start, end, totalRecordsByPage }
}

const pagination = async ({
  operationCrud,
  queryParams = {},
  objTable = {}
}) => {
  const {
    keyWord = '',
    dataSelect = [],
    page = 1,
    totalRecordsByPage = 10,
    arrayWhereIn = [],
    fieldsToSearchByKeyWord = [],
    objWhereNot = {},
    arrayWhereNotIn = [],
    whereBetweenValues,
    arrayOrderBy = []
  } = queryParams
  const tableInfo = {}
  const { arrayWhereInJoin, likeValues } = getWhereIn({
    queryParams,
    arrayWhereIn,
    objTable,
    keyWord,
    fieldsToSearchByKeyWord
  })

  tableInfo.tableName = objTable
  tableInfo.optionCrud = 'read'
  tableInfo.dataQuery = {
    objWhereNot,
    count: true,
    likeValues,
    arrayWhereIn: arrayWhereInJoin,
    arrayWhereNotIn
  }
  Boolean(whereBetweenValues) && (tableInfo.dataQuery.whereBetweenValues = whereBetweenValues)
  const totalValues = await operationCrud(tableInfo)
  const totalRecords = totalValues[0].totalRecords // Se encarga de traer el total de registros

  const pager = getStartEndValuesPagination({
    pageSelected: parseInt(page),
    totalRecords,
    totalRecordsByPage: parseInt(totalRecordsByPage)
  })

  tableInfo.optionCrud = 'read'
  tableInfo.dataQuery = {
    objWhereNot,
    arrayWhereIn: arrayWhereInJoin,
    dataSelect,
    pager,
    likeValues,
    arrayWhereNotIn,
    arrayOrderBy
  }
  Boolean(whereBetweenValues) && (tableInfo.dataQuery.whereBetweenValues = whereBetweenValues)
  const catalogData = await operationCrud(tableInfo)

  return {
    catalogData,
    totalPages: pager.totalPages,
    currentPage: parseInt(page > pager.totalPages ? pager.totalPages : page),
    totalRecords
  }
}

module.exports = pagination
