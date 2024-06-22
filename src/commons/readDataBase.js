const { completeCatalogs } = require('./catalogsToLoad')
const { database } = require('../environment')
const { gmcModelsApp } = completeCatalogs

const readDataBase = async ({ system = null, currentDataBase = {} }) => {
  const { operationCrud, utils } = system
  const { throwErrorMessage } = utils

  if (Object.keys(currentDataBase).length) return currentDataBase

  const getInfoDB = await operationCrud({
    tableName: gmcModelsApp.xpCovGMCBaseDatos,
    optionCrud: 'useQuery',
    dataQuery: {
      query: `
            select baseDatos
            from ${database}.dbo.xpCovGMCBaseDatos
            where aplicativo = 'gmc'
            `
    }
  })

  if (getInfoDB.length > 1) {
    throwErrorMessage({
      name: 'tooManyDataBases',
      message: 'Hay demasiadas bases GMC'
    })
  }

  currentDataBase = getInfoDB[0]

  return currentDataBase
}

module.exports = readDataBase
