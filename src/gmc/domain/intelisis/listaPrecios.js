const columnNames = [
  {
    columnName: 'Moneda',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const listaPrecios = {
  name: 'Catálogo de Lista Precios',
  tableName: 'listaPrecios',
  idTable: 'lista',
  columns: columnNames.map((item) => item.columnName),
  searchableColumns: ['lista'],
  columnNames,
  isIntelisis: true
}

module.exports = listaPrecios
