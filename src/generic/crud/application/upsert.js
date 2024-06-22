const objModels = require('../../../commons/catalogsToLoad')
const { allCatalogs: crudModels } = objModels

const upsertResource = async ({ system, catalogName, body, locals }) => {
  const { utils, operationCrud } = system
  const { throwErrorMessage } = utils
  const { dataUpsert = [], replaceInfo = [] } = body

  let dataInsert = []
  let dataUpdate = []
  let resourcesCreated = []
  let resourcesUpdated = []
  let arrayDataUpdate = []

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

  dataUpsert.forEach((element) => {
    if (!element[idCatalog]) {
      const addInfoLocals = replaceInfo.reduce((acum, item) => {
        const { localsKey = '', columnKey = '' } = item

        acum = {
          ...acum,
          [columnKey]: locals[localsKey]
        }

        return acum
      }, {})

      dataInsert = [...dataInsert, { ...element, ...addInfoLocals }]
    } else {
      dataUpdate = [...dataUpdate, element]
    }
  })

  if (dataInsert.length) {
    resourcesCreated = await operationCrud({
      tableName: catalogOption,
      optionCrud: 'create',
      dataQuery: {
        dataInsert
      }
    })
  }
  if (dataUpdate.length) {
    arrayDataUpdate = dataUpdate.map(async (item) => {
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
    } else resourcesUpdated = dataUpdate
  }

  return {
    resourcesCreated,
    resourcesUpdated
  }
}

module.exports = {
  upsertResource
}
