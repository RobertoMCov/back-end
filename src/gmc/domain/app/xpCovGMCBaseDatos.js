const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'aplicativo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'servidor',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'baseDatos',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'usuario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'contrasena',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'CONVERT(varchar, fechaRegistro, 103) AS fechaRegistro',
    schema: { type: ['string'] }
  }
]

const xpCovGMCBaseDatos = {
  name: 'Base de datos por aplicativo',
  tableName: 'xpCovGMCBaseDatos',
  idTable: 'idXpCovGMCBaseDatos',
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
  }
}

module.exports = xpCovGMCBaseDatos
