// const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
    {
        columnName: 'folio',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'tipoCita',
        schema: { type: ['string'] },
        isRequired: true
    },
    {
        columnName: 'detalleCita',
        schema: { type: ['string'] },
    },
    {
        columnName: 'fecha',
        schema: { type: ['string'] },
    },
    {
        columnName: 'horario',
        schema: { type: ['string'] },
    },
    {
        columnName: 'estatus',
        schema: { type: ['string'] },
    },
]

const ConectaCitas = {
    name: 'Tabla de citas para conecta',
    tableName: 'ConectaCitas',
    idTable: 'IdCita',
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

module.exports = ConectaCitas
