const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'reportaA',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'sucursalEmpresa',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const agente = {
  name: 'Catálogo de agentes',
  tableName: 'agente',
  idTable: 'agente',
  columns: columnNames.map((item) => item.columnName),
  searchableColumns: ['nombre', 'agente'],
  columnNames,
  isIntelisis: true
}

module.exports = agente
