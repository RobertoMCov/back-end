const columnNames = [
  {
    columnName: 'codigo',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'cuenta',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'cantidad',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'unidad',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const cb = {
  name: 'Catálogo de códigos de artículos',
  tableName: 'cb',
  idTable: 'cuenta',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = cb
