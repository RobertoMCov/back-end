const pagination = require('./pagination')
const objModels = require('./catalogsToLoad')
const { completeCatalogs } = objModels

let catalogos = []

const filterColumnsByModel = ({
  fields = '',
  rawFields,
  model = { columns: [] }
}) => {
  const modelFields = [...model.columns].map((item) => item.toLowerCase())
  const columnsToSelect = fields.length
    ? rawFields
        ? fields.split('|')
        : fields
          .split('|')
          .filter((field) => modelFields.includes(field.toLowerCase()))
    : [model.idTable, ...model.columns]
  return [...new Set(columnsToSelect)]
}

const addCatalog = (catalog) => {
  if (
    !catalogos.some(
      (currentCatalog) => currentCatalog.tableName === catalog.tableName
    )
  ) {
    catalogos = [...catalogos, catalog]
  }
}
Object.keys(completeCatalogs).forEach((objCatalogs) => {
  Object.keys(completeCatalogs[objCatalogs]).forEach((catalog) => {
    addCatalog(completeCatalogs[objCatalogs][catalog])
  })
})

const findCatalog = (catalogName) =>
  catalogos.find(
    (catalogo) => catalogo?.tableName?.toLowerCase() === catalogName
  )

const getCatalog = async (params) => {
  const {
    catalogName,
    queryParams = {},
    dataQuery,
    system: {
      operationCrud,
      utils: { throwErrorMessage }
    }
  } = params

  const {
    page = 1,
    totalRecordsByPage,
    keyWord,
    keyToSearch,
    massive,
    fields = '',
    rawFields
  } = queryParams

  if (!catalogName) {
    throwErrorMessage({
      name: 'informationNotComplete',
      message: 'Falta indicar el catalogo a buscar'
    })
  }
  const catalog = findCatalog(catalogName.toLowerCase())
  if (!catalog) {
    throwErrorMessage({
      name: 'catalogNotFound',
      message: 'Catalogo no encontrado'
    })
  }

  /**
   * Las columnas se consultan de acuerdo al modelo,
   * si quieres columnas en especifico se pueden pasar por medio del query param fields separado por pipe ej. "column1|column2|..."
   *    TODO:  si en fields quieres consultar sin que valide contra el modelo debes pasar el quiery param "rawFields" con valor true #PENDIENTE, para completar la funcionalidad se debe pasar el el where un paraetro raw o un agrupador
   */
  const modelFields = [...catalog.columns].map((item) => item.toLowerCase())
  const columnsToSelect = fields.length
    ? rawFields
        ? fields.split('|')
        : fields
          .split('|')
          .filter((field) => modelFields.includes(field.toLowerCase()))
    : [catalog.idTable, ...catalog.columns]
  const dataSelect = [...new Set(columnsToSelect)]

  /**
   * El where se puede construir a partir de los query params y validando contra los campos del modelo,
   * para esto solo es necesario pasar el query param con el nombre del campo,
   *    y si se quieren evaludar varios valores de un campo se debe separar por pipe ej. column1="txt1|txt2|..."
   */
  const dataWhere = {}
  let arrayWhereIn = []
  let objWhereNot = {}
  let arrayWhereNotIn = []

  Object.keys(queryParams).forEach((paramKey) => {
    let removeWhereNot = paramKey.split('whereNot')
    removeWhereNot =
      removeWhereNot.length === 1 ? removeWhereNot[0] : removeWhereNot[1]
    if (dataSelect.includes(removeWhereNot)) {
      if (!paramKey.includes('whereNot')) {
        const value = queryParams[paramKey]
        if (value.includes('|')) {
          arrayWhereIn = [...arrayWhereIn, [paramKey, value.split('|')]]
        } else {
          dataWhere[paramKey] = queryParams[paramKey]
        }
      } else {
        objWhereNot = {
          ...objWhereNot,
          [removeWhereNot]: queryParams[paramKey]
        }
      }
    }
  })

  Object.keys(objWhereNot).forEach((item) => {
    arrayWhereNotIn = [
      ...arrayWhereIn,
      { column: item, arrayWhereNot: objWhereNot[item].split('|') }
    ]
  })

  /**
   * [1] Por defecto el servicio devuelve los primeros 10 registros,
   * en caso de querer todos los datos, se debe psara el query param massive="true"
   * para realizar la consulta masiva de la información
   *
   * [2] En caso de ocupar em metodo internamente existe el parametro dataQuery el cual es un objeto,
   * en donde se debe indicar la configuración de la consulta, como los campos buscar o los criterios de filtro "where"
   */

  if (massive === 'true' || dataQuery) {
    const paramsQuery = dataQuery || { dataWhere, arrayWhereIn }
    const data = await operationCrud({
      tableName: catalog,
      optionCrud: 'read',
      dataQuery: {
        dataSelect,
        arrayWhereNotIn,
        ...paramsQuery
      }
    })
    return { records: data.length, catalogData: data }
  }

  //  la función pagination nos permite obtener los registros de acuerdo a los filtros y rango de busqueda indicado o por defecto consultara los primeros 10
  const { catalogData, totalPages, currentPage, totalRecords } =
    await pagination({
      operationCrud,
      objTable: catalog,
      queryParams: {
        dataQuery,
        massive,
        keyWord,
        dataSelect,
        fieldsToSearchByKeyWord: keyToSearch
          ? [keyToSearch]
          : catalog.searchableColumns,
        model: catalog,
        page,
        ...queryParams,
        totalRecordsByPage,
        dataWhere,
        arrayWhereNotIn
      }
    })

  return {
    fields: dataSelect,
    name: catalog.name,
    totalPages,
    currentPage,
    totalRecords,
    catalogData
  }
}

const getListCatalogs = () => catalogos

module.exports = {
  filterColumnsByModel,
  addCatalog,
  catalogos,
  getCatalog,
  getListCatalogs
}
