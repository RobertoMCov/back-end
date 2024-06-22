const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'idXpCovGMCEmpresaUsuario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'idXpCovGMCComponente',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCEmpresaUsuarioComponente = {
  name: 'Tabla empresa-usuario-componente',
  tableName: 'xpCovGMCEmpresaUsuarioComponente',
  idTable: 'idXpCovGMCEmpresaUsuarioComponente',
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

module.exports = xpCovGMCEmpresaUsuarioComponente
