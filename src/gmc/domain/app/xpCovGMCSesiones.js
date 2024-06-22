const columnNames = [
  {
    columnName: 'sesionInicio',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'ultimaActualizacion',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'empresa',
    schema: { type: ['string'] }
  },
  {
    columnName: 'aplicativo',
    schema: { type: ['string'] }
  },
  {
    columnName: 'origen',
    schema: { type: ['string'] }
  },
  {
    columnName: 'ip',
    schema: { type: ['string'] }
  },
  {
    columnName: 'usuario',
    schema: { type: ['string'] }
  }
]

const xpCovGMCSesiones = {
  name: 'Sesiones',
  tableName: 'xpCovGMCSesiones',
  idTable: 'token',
  columns: columnNames.map((item) => item.columnName),
  columnNames
}

module.exports = xpCovGMCSesiones
