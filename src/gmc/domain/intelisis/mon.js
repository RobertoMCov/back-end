const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] }
  },
  {
    columnName: 'tipoCambio',
    schema: { type: ['string'] }
  },
  {
    columnName: 'ultimoCambio',
    schema: { type: ['string'] }
  },
  {
    columnName: 'clave',
    schema: { type: ['string'] }
  }
]

const mon = {
  name: 'Catálogo de moneda',
  tableName: 'mon',
  idTable: 'moneda',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  searchableColumns: [],
  isIntelisis: true
}

module.exports = mon
