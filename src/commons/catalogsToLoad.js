const gmcModelsApp = require('../gmc/domain/app')
const gmcModelsIntelisis = require('../gmc/domain/intelisis')

module.exports = {
  allCatalogs: {
    ...gmcModelsApp,
    ...gmcModelsIntelisis,
  },
  completeCatalogs: {
    gmcModelsApp,
    gmcModelsIntelisis,
  }
}
