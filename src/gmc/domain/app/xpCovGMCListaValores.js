const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'claveLista',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'clave',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCListaValores = {
  name: 'Lista de valores por Default',
  tableName: 'xpCovGMCListaValores',
  idTable: 'idXpCovGMCListaValores',
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

module.exports = xpCovGMCListaValores
