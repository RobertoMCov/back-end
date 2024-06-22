const { dateFormat } = require('../../../infrastructure/dependencies')
const xpCovGMCModulo = require('./xpCovGMCModulo')

const columnNames = [
  {
    columnName: 'descripcionA',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] }
  },
  {
    columnName: 'tipoAplicativo',
    schema: { type: ['string'] }
  }
]

const xpCovGMCAplicativo = {
  name: 'Tabla de aplicativos',
  tableName: 'xpCovGMCAplicativo',
  idTable: 'aplicativo',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  beforeInsert: function () {
    const sqlDate = dateFormat.getDateFormat({
      date: new Date(),
      formatDate: 'y-MM-dd HH:mm:ss'
    })

    return {
      fechaRegistro: sqlDate,
      fechaModificacion: sqlDate
    }
  },
  beforeUpdate: function () {
    const sqlDate = dateFormat.getDateFormat({
      date: new Date(),
      formatDate: 'y-MM-dd HH:mm:ss'
    })

    return {
      fechaModificacion: sqlDate
    }
  },
  arrayRelations: [
    {
      relationModel: 'HasManyRelation',
      relationName: 'applicationModuleGMC',
      modelClass: xpCovGMCModulo,
      joinFrom: {
        tableName: 'xpCovGMCAplicativo',
        keyJoinFrom: 'aplicativo'
      },
      joinTo: {
        tableName: 'xpCovGMCModulo',
        keyJoinTo: 'aplicativo'
      }
    }
  ]
}

module.exports = xpCovGMCAplicativo
