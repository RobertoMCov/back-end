const {
  selectInformation,
  insertAndFetchItem,
  insertItem,
  insertRelationItem,
  updateInformation,
  useSP,
  useQuery,
  deleteInformationById,
  deleteInformation
} = require('./queries')
const { modelDB } = require('./model')
const { Knex } = require('../orm/configDB')
const { throwErrorMessage, object } = require('../utils')
const { completeCatalogs } = require('../../commons/catalogsToLoad')
const { sqlPhrase, database } = require('../../environment')
const { defaultEnvironment } = require('../../infrastructure/orm/configDB')
const { gmcModelsApp } = completeCatalogs
let intelisisConnection = []

const intelisisConn = {}

const operationCrud = async ({
  tableName = {},
  dataQuery = {},
  optionCrud = ''
}) => {
  let {
    dataInsert = {},
    dataSelect = [],
    dataNotSelect = [],
    objModifiers = {}
  } = dataQuery
  const { columnNames = [] } = tableName
  let buildTable = null
  let dataQueryOptions = {}
  const copyDefaultEnvironment = {
    ...JSON.parse(JSON.stringify(defaultEnvironment))
  } // deep copy of Objects
  let arrayDataSelect = []
  if (tableName?.isIntelisis) {
    if (!intelisisConnection.length) {
      intelisisConnection = await operationCrud({
        tableName: gmcModelsApp.xpCovGMCBaseDatos,
        optionCrud: 'useQuery',
        dataQuery: {
          query: `
            select servidor, baseDatos, usuario, CONVERT(varchar, DECRYPTBYPASSPHRASE('${sqlPhrase}',Contrasena)) AS contrasena from ${database}.dbo.${gmcModelsApp.xpCovGMCBaseDatos.tableName}
            where aplicativo = 'gmc'
                `
        }
      })

      if (!intelisisConnection.length) {
        throwErrorMessage({
          name: 'dbConnectionError',
          message: 'No existe una conexión en la tabla xpCovGMCBaseDatos'
        })
      }
    }

    // TODO: Modificar para varias plataformas
    const { servidor, baseDatos, usuario, contrasena } = intelisisConnection[0]

    copyDefaultEnvironment.connection.host = servidor
    copyDefaultEnvironment.connection.user = usuario
    copyDefaultEnvironment.connection.password = contrasena
    copyDefaultEnvironment.connection.database = baseDatos
  }

  if (optionCrud === 'create') {
    const validation = (dataInsertObj) => {
      columnNames.forEach((columnOption) => {
        const { columnName = '', isRequired } = columnOption
        if (
          isRequired && typeof dataInsertObj[columnName] === 'string'
            ? !dataInsertObj[columnName]
            : false
        ) {
          throwErrorMessage({
            name: 'fieldRequired',
            message: `El campo ${columnName} es requerido`
          })
        }
      })

      const dataFiltered = {
        ...object.clearObject({
          objectToClean: dataInsertObj,
          valuesToRemove: columnNames.map((item) => item.columnName),
          reverse: true
        })
      }
      return dataFiltered
    }

    if (Array.isArray(dataInsert)) {
      dataInsert.map((data) => validation(data))
    } else {
      dataInsert = validation(dataInsert)
    }
  }

  if (optionCrud === 'read') {
    arrayDataSelect = [...arrayDataSelect, ...dataSelect]
  }

  if (optionCrud === 'read' && !Object.keys(objModifiers).length) {
    arrayDataSelect = [...arrayDataSelect]
    if (!dataSelect) {
      arrayDataSelect.push(tableName.idTable)
      //  = [...arrayDataSelect, tableName.idTable]
    }
  }

  if (optionCrud === 'read' && !dataSelect?.length) {
    arrayDataSelect = [
      ...arrayDataSelect,
      ...columnNames.map((column) => column.columnName)
    ]
  }

  if (optionCrud === 'read' && dataNotSelect.length) {
    arrayDataSelect = [
      ...arrayDataSelect,
      ...columnNames.reduce((acum, column) => {
        if (!dataNotSelect.includes(column.columnName)) {
          acum = [...acum, column.columnName]
        }
        return acum
      }, [])
    ]
  }

  arrayDataSelect = [...new Set(arrayDataSelect)]

  if (!['useSP', 'useQuery'].includes(optionCrud)) {
    buildTable = modelDB({
      objModifiers,
      dataModel: tableName,
      defaultEnvironment: copyDefaultEnvironment
    })
    // if (tableName?.isIntelisis) {
    //   buildTable = buildTable.bindKnex(Knex(copyDefaultEnvironment))
    // }
  }

  dataQueryOptions = {
    ...dataQuery,
    ...dataQueryOptions,
    dataSelect: arrayDataSelect,
    tableName: buildTable
  }

  if (['useSP', 'useQuery'].includes(optionCrud)) {
    if (!intelisisConn[copyDefaultEnvironment.connection.database]) {
      intelisisConn[copyDefaultEnvironment.connection.database] = Knex(copyDefaultEnvironment)
    }
    dataQueryOptions = {
      ...dataQuery,
      ...dataQueryOptions,
      appDBConnection: intelisisConn[copyDefaultEnvironment.connection.database]
    }
  }

  switch (optionCrud) {
    case 'create':
      return insertAndFetchItem(dataQueryOptions)

    case 'createSO':
      return insertItem(dataQueryOptions)

    case 'read':
      return selectInformation(dataQueryOptions)

    case 'update':
      return updateInformation(dataQueryOptions)

    case 'relationCreate':
      return insertRelationItem(dataQueryOptions)

    case 'useSP':
      return useSP(dataQueryOptions)

    case 'useQuery':
      return useQuery(dataQueryOptions)

    case 'deleteById':
      return deleteInformationById(dataQueryOptions)

    case 'delete':
      return deleteInformation(dataQueryOptions)

    default:
      return null
  }
}

module.exports = operationCrud
