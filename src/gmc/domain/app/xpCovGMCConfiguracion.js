const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'aplicativo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'empresa',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'modulo',
    schema: { type: ['string'] }
  },
  {
    columnName: 'parametro',
    schema: { type: ['string'] }
  },
  {
    columnName: 'valor',
    schema: { type: ['string'] }
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] }
  },
  {
    columnName: 'fechaRegistro',
    schema: { type: ['string'] }
  },
  {
    columnName: 'usuario',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCConfiguracion = {
  name: 'Variables de configuración de aplicativos',
  tableName: 'xpCovGMCConfiguracion',
  idTable: 'id',
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

module.exports = xpCovGMCConfiguracion
