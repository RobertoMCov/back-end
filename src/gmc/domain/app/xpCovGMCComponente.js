const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'idXpCovGMCModulo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'componente',
    schema: { type: ['string'], isRequired: true }
  },
  {
    columnName: 'descripcionC',
    schema: { type: ['string'], isRequired: true }
  }
]

const xpCovGMCComponente = {
  name: 'Componentes GMC',
  tableName: 'xpCovGMCComponente',
  idTable: 'idXpCovGMCComponente',
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

module.exports = xpCovGMCComponente
