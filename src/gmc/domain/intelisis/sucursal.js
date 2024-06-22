const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'prefijo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const sucursal = {
  name: 'Catálogo de sucursales intelisis',
  tableName: 'sucursal',
  idTable: 'sucursal',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = sucursal
