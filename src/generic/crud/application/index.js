const objModels = require('../../../commons/catalogsToLoad')
const { allCatalogs: crudModels } = objModels
const { upsertResource } = require('./upsert')

const createResource = async ({ system, body, queryParams }) => {
  const { operationCrud, utils } = system
  const { throwErrorMessage } = utils
  const { modelName = '' } = queryParams
  const objTable = crudModels[modelName]

  if (!objTable) {
    throwErrorMessage({
      name: 'resourceNotExist',
      message: `No fue encontrado el recurso:  ${modelName}, verificar el nombre del modelo o el archivo de crudModels`
    })
  }

  const model = objTable
  const resourceCreated = await operationCrud({
    tableName: model,
    optionCrud: 'create',
    dataQuery: {
      dataInsert: body
    }
  })

  return resourceCreated
}

const updateResource = async ({ system, catalogName, body }) => {
  const { utils, operationCrud } = system
  const { throwErrorMessage } = utils
  const { dataUpdate = [] } = body

  if (!catalogName) {
    throwErrorMessage({
      name: 'informationNotComplete',
      message: 'Falta indicar el catalogo a buscar'
    })
  }

  const catalogOption = crudModels[catalogName]

  if (!catalogOption) {
    throwErrorMessage({
      name: 'catalogNoFound',
      message: 'No se encontró dicho catálogo'
    })
  }

  const idCatalog = catalogOption.idTable

  if (dataUpdate.length) {
    const arrayDataUpdate = dataUpdate.map(async (item) => {
      const copyItem = { ...item }
      const idResource = copyItem[idCatalog]
      delete copyItem[idCatalog]

      return operationCrud({
        tableName: catalogOption,
        optionCrud: 'update',
        dataQuery: {
          dataWhere: { [idCatalog]: idResource },
          dataUpdate: copyItem
        }
      })
    })

    const verifyUpdate = await Promise.all(arrayDataUpdate)

    if (verifyUpdate.includes(0)) {
      throwErrorMessage({
        name: 'updateError',
        message: 'No se pudo actualizar la información'
      })
    }
  }

  return body
}

const getInfoResource = async ({ system, catalogName = '', queryParams }) => {
  let topSelectParse = 0
  let pageParse = 0
  let parsePagination = false
  let parseNumberOfItems = 0
  let parseOrderList = ''
  let parseAlLColumns = ''

  const { buildQuery } = system
  const {
    addAllColumns = 'false',
    topSelect = '0',
    massive = 'false',
    page = '1',
    totalRecordsByPage = '10',
    orderList = 'ASC',
    initialDate = '',
    finalDate = '',
    keyWord = '',
    fields,
    dateColumnName = 'fechaRegistro',
    fieldsToSearch = '',
    orderByParams = '',
    ...restParams
  } = queryParams
  const lowerCaseList = orderList.toLowerCase()
  const columnParams = fields ? fields.split('||') : []
  let columnsToSearch = fieldsToSearch.split('||')
  columnsToSearch = columnsToSearch.map((item) => ({ columnValue: item }))

  parseAlLColumns = addAllColumns === 'true'
  topSelectParse = !isNaN(topSelect) ? parseInt(topSelect) : 0
  parsePagination = !(massive === 'true')
  pageParse = !isNaN(page) ? parseInt(page) : 0
  parseNumberOfItems = !isNaN(totalRecordsByPage)
    ? parseInt(totalRecordsByPage)
    : 0

  parseOrderList = ['asc', 'desc'].includes(lowerCaseList)
    ? lowerCaseList
    : 'asc'

  const infoResource = await buildQuery.dynamicBuildQuery({
    system,
    body: {
      modelName: catalogName,
      addAllColumns: parseAlLColumns,
      topSelect: topSelectParse,
      hasPagination: parsePagination,
      page: pageParse,
      numberOfItems: parseNumberOfItems,
      orderByOption: parseOrderList,
      initialDate,
      finalDate,
      searchWord: keyWord,
      columnParams,
      dateColumnName,
      whereInParams: restParams,
      arraySearch: columnsToSearch,
      orderByParams
    }
  })

  return infoResource
}

module.exports = {
  createResource,
  upsertResource,
  updateResource,
  getInfoResource
}
