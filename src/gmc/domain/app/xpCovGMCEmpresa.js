const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'empresa',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'nombreE',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'rfc',
    schema: { type: ['string'] }
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCEmpresa = {
  name: 'Empresas',
  tableName: 'xpCovGMCEmpresa',
  idTable: 'idXpCovGMCEmpresa',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  searchableColumns: ['empresa', 'nombreE'],
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

module.exports = xpCovGMCEmpresa
