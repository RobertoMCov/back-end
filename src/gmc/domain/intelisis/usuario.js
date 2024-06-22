const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const usuario = {
  name: 'Catálogo de Usuario',
  tableName: 'usuario',
  idTable: 'usuario',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = usuario
