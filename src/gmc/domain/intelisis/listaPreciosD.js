const columnNames = [
  {
    columnName: 'lista',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'pjeMantto',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'pjePublicidad',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'moneda',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const listaPreciosD = {
  name: 'Lista de Precios D',
  tableName: 'listaPreciosD',
  idTable: 'articulo',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = listaPreciosD
