const columnNames = [
  {
    columnName: 'descripcion',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const proy = {
  name: 'Catálogo de proyectos',
  tableName: 'proy',
  idTable: 'proyecto',
  columns: columnNames.map((item) => item.columnName),
  searchableColumns: ['proyecto'],
  columnNames,
  isIntelisis: true
}

module.exports = proy
