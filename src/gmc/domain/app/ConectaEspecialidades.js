// const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
    {
        columnName: 'nombre',
        schema: { type: ['string'] },
        isRequired: true
    },
]

const ConectaEspecialidades = {
    name: 'Tabla de especialidades Salud Conecta',
    tableName: 'ConectaEspecialidades',
    idTable: 'IdEspecialidad',
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

module.exports = ConectaEspecialidades
