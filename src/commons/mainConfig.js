const system = {}
system.dependencies = require('../infrastructure/dependencies')
system.middleware = require('../infrastructure/middleware')
system.operationCrud = require('../infrastructure/orm/operationCrud')
system.utils = require('../infrastructure/utils')
system.buildQuery = require('../generic/buildQuery/application')

module.exports = {
  system
}
