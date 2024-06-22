const { dateFormat } = require('../../../infrastructure/dependencies')
const columnNames = [
  {
    columnName: 'usuario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'usuarioIntelisis',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'personalIntelisis',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'fechaRegistro',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'fechaModificacion',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovSesion = {
  name: 'Sesiones GMC',
  tableName: 'xpCovSesion',
  idTable: 'token',
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
  arrayRelations: []
}

module.exports = xpCovSesion
