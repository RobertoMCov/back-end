const { dateFormat } = require('../../../infrastructure/dependencies')
const xpCovGMCEmpresaUsuarioComponente = require('./xpCovGMCEmpresaUsuarioComponente')

const columnNames = [
  {
    columnName: 'idXpCovGMCEmpresa',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'usuario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const xpCovGMCEmpresaUsuario = {
  name: 'Tabla empresa-usuario',
  tableName: 'xpCovGMCEmpresaUsuario',
  idTable: 'idXpCovGMCEmpresaUsuario',
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
      relationName: 'businessUserComponent',
      modelClass: xpCovGMCEmpresaUsuarioComponente,
      joinFrom: {
        tableName: 'xpCovGMCEmpresaUsuario',
        keyJoinFrom: 'idXpCovGMCEmpresaUsuario'
      },
      joinTo: {
        tableName: 'xpCovGMCEmpresaUsuarioComponente',
        keyJoinTo: 'idXpCovGMCEmpresaUsuario'
      }
    }
  ]
}

module.exports = xpCovGMCEmpresaUsuario
