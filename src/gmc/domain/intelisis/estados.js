const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const estados = {
  name: 'Catálogo de estados',
  tableName: 'estados',
  idTable: 'idEstado',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = estados
