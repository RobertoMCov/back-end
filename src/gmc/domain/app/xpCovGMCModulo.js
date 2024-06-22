const { dateFormat } = require('../../../infrastructure/dependencies')
const xpCovGMCComponente = require('./xpCovGMCComponente')

const columnNames = [
  {
    columnName: 'aplicativo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'modulo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'descripcionM',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCModulo = {
  name: 'Módulos GMC',
  tableName: 'xpCovGMCModulo',
  idTable: 'idXpCovGMCModulo',
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
      relationName: 'moduleComponentGMC',
      modelClass: xpCovGMCComponente,
      joinFrom: {
        tableName: 'xpCovGMCModulo',
        keyJoinFrom: 'idXpCovGMCModulo'
      },
      joinTo: {
        tableName: 'xpCovGMCComponente',
        keyJoinTo: 'idXpCovGMCModulo'
      }
    }
  ]
}

module.exports = xpCovGMCModulo
