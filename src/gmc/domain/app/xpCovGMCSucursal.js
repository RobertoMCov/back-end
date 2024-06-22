const { dateFormat } = require('../../../infrastructure/dependencies')
const xpCovGMCSucursalUsuario = require('./xpCovGMCSucursalUsuario')

const columnNames = [
  {
    columnName: 'sucursal',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'nombreS',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCSucursal = {
  name: 'Sucursales',
  tableName: 'xpCovGMCSucursal',
  idTable: 'idXpCovGMCSucursal',
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
      relationName: 'branchOfficeUser',
      modelClass: xpCovGMCSucursalUsuario,
      joinFrom: {
        tableName: 'xpCovGMCSucursal',
        keyJoinFrom: 'sucursal'
      },
      joinTo: {
        tableName: 'xpCovGMCSucursalUsuario',
        keyJoinTo: 'sucursal'
      }
    }
  ]
}

module.exports = xpCovGMCSucursal
