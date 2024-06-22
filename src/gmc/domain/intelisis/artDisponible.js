const columnNames = [
  {
    columnName: 'almacen',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'disponible',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'apartado',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'dispMenosApartado',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const artDisponible = {
  name: 'Catálogo de Artículos disponibles',
  tableName: 'artDisponible',
  idTable: 'articulo',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = artDisponible
