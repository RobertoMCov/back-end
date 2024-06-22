const columnNames = [
  {
    columnName: 'empresa',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'mov',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'movId',
    schema: { type: ['string'] }
  },
  {
    columnName: 'referencia',
    schema: { type: ['string'] }
  },
  {
    columnName: 'importe',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'impuestos',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'precioTotal',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'moneda',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'cliente',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'agente',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'usuario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'fechaEmision',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'fechaOriginal',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'fechaRequerida',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'almacen',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'tipoCambio',
    schema: { type: ['number'] },
    isRequired: true
  }
]

const venta = {
  name: 'Catálogo de ventas',
  tableName: 'venta',
  idTable: 'id',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = venta
