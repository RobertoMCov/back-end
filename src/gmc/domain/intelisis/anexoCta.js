const columnNames = [
  {
    columnName: 'idr',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'direccion',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'orden',
    schema: { type: ['number'] }
  }
]

const anexoCta = {
  name: 'Imágenes',
  tableName: 'anexoCta',
  idTable: 'cuenta',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = anexoCta
