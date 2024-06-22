const columnNames = [
  {
    columnName: 'mov',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'movId',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'referencia',
    schema: { type: ['string'] }
  },
  {
    columnName: 'fechaEmision',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'vencimiento',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'saldo',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'importe',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'cliente',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const cxc = {
  name: 'Catálogo de cuentas por cobrar',
  tableName: 'cxc',
  idTable: 'id',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = cxc
