const columnNames = [
  {
    columnName: 'descripcion',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const fiscalRegimen = {
  name: 'Catálogo de régimen fiscal',
  tableName: 'fiscalRegimen',
  idTable: 'fiscalRegimen',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = fiscalRegimen
