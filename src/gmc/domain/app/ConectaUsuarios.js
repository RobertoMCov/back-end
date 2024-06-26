// const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
    {
        columnName: 'nombre',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'apellidoPaterno',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'apellidoMaterno',
        schema: { type: ['string'] },
    },
    {
        columnName: 'sexo',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'fechaNacimiento',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'estado',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'municipio',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'inicioTratamiento',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'estatusTratamiento',
        schema: { type: ['string'] },
    },
    {
        columnName: 'tipoUsuario',
        schema: { type: ['string'] },
    },
]

const ConectaUsuarios = {
    name: 'Tabla de usuarios para conecta',
    tableName: 'ConectaUsuarios',
    idTable: 'folio',
    columns: columnNames.map((item) => item.columnName),
    columnNames,
    //   beforeInsert: function () {
    //     const sqlDate = dateFormat.getDateFormat({
    //       date: new Date(),
    //       formatDate: 'y-MM-dd HH:mm:ss'
    //     })

    //     return {
    //       fechaRegistro: sqlDate,
    //       fechaModificacion: sqlDate
    //     }
    //   },
    //   beforeUpdate: function () {
    //     const sqlDate = dateFormat.getDateFormat({
    //       date: new Date(),
    //       formatDate: 'y-MM-dd HH:mm:ss'
    //     })

    //     return {
    //       fechaModificacion: sqlDate
    //     }
    //   },
    //   arrayRelations: []
}

module.exports = ConectaUsuarios
