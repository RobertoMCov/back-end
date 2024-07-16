// const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
    {
        columnName: 'nombre',
        schema: { type: ['string'] },
        isRequired: true
    },
]

const ConectaEstudios = {
    name: 'Tabla de estudios Salud Conecta',
    tableName: 'ConectaEstudios',
    idTable: 'IdEstudio',
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

}

module.exports = ConectaEstudios
