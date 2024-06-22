const columnNames = [
  {
    columnName: 'codigoPostal',
    schema: { type: ['string'] }
  },
  {
    columnName: 'colonia',
    schema: { type: ['string'] }
  },
  {
    columnName: 'delegacion',
    schema: { type: ['string'] }
  },
  {
    columnName: 'estado',
    schema: { type: ['string'] }
  }
]

const codigoPostal = {
  name: 'Codigo Postal',
  tableName: 'codigoPostal',
  idTable: 'id',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = codigoPostal
