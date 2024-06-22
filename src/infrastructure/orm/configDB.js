const Knex = require('knex')
const { Model } = require('objection')
const { host, user, password, database, portDatabase = 1433, instanceNameDatabase = '' } = require('../../environment')
const requestTimeout = 240000

const defaultEnvironment = {
  client: 'mssql',
  connection: {
    host,
    user,
    password,
    database,
    port: parseInt(portDatabase),
    pool: {
      max: 10,
      min: 0
    },
    options: {
      enableArithAbort: true
    },
    requestTimeout
  }
}

if (instanceNameDatabase) defaultEnvironment.connection.options.instanceName = instanceNameDatabase

const appDB = Knex(defaultEnvironment)

module.exports = {
  initializeConnectionDB: () => Model.knex(appDB),
  appDB,
  Knex,
  defaultEnvironment
}
