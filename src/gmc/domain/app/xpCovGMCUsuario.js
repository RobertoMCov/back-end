const { dateFormat } = require('../../../infrastructure/dependencies')
const xpCovGMCEmpresaUsuario = require('./xpCovGMCEmpresaUsuario')

const columnNames = [
  {
    columnName: 'usuarioIntelisis',
    schema: { type: ['string'] }
  },
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'apellidoPaterno',
    schema: { type: ['string'] }
  },
  {
    columnName: 'apellidoMaterno',
    schema: { type: ['string'] }
  },
  {
    columnName: 'contrasena',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] }
  },
  {
    columnName: 'correo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'perfil',
    schema: { type: ['string'] }
  },
  {
    columnName: 'empresa',
    schema: { type: ['string'] }
  },
  {
    columnName: 'personalIntelisis',
    schema: { type: ['string'] }
  },
  {
    columnName: 'agenteIntelisis',
    schema: { type: ['string'] }
  },
  {
    columnName: 'claveToken',
    schema: { type: ['string'] }
  },
  {
    columnName: 'privilegio',
    schema: { type: ['string'] }
  }
]

const xpCovGMCUsuario = {
  name: 'Usuarios',
  tableName: 'xpCovGMCUsuario',
  idTable: 'usuario',
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
      relationName: 'businessUser',
      modelClass: xpCovGMCEmpresaUsuario,
      joinFrom: {
        tableName: 'xpCovGMCUsuario',
        keyJoinFrom: 'usuario'
      },
      joinTo: {
        tableName: 'xpCovGMCEmpresaUsuario',
        keyJoinTo: 'usuario'
      }
    }
  ]
}

module.exports = xpCovGMCUsuario
