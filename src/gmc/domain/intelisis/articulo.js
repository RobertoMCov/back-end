const columnNames = [
  {
    columnName: 'codigo',
    schema: { type: ['string'] }
  },
  {
    columnName: 'descripcion1',
    schema: { type: ['string'] }
  },
  // {
  //   columnName: 'nombreCorto',
  //   schema: { type: ['string'] }
  // },
  {
    columnName: 'rama',
    schema: { type: ['string'] }
  },
  {
    columnName: 'grupo',
    schema: { type: ['string'] }
  },
  {
    columnName: 'categoria',
    schema: { type: ['string'] }
  },
  {
    columnName: 'familia',
    schema: { type: ['string'] }
  },
  {
    columnName: 'linea',
    schema: { type: ['string'] }
  },
  {
    columnName: 'fabricante',
    schema: { type: ['string'] }
  },
  {
    columnName: 'costoPromedio',
    schema: { type: ['number'] },
    isRequired: true
  },
  {
    columnName: 'unidad',
    schema: { type: ['string'] }
  }
  // {
  //   columnName: 'impuesto1',
  //   schema: { type: ['number'] }
  // }
]

const articulo = {
  name: 'Catálogo de artículos intelisis',
  tableName: 'articulo',
  idTable: 'articulo',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  searchableColumns: ['articulo', 'descripcion1'],
  isIntelisis: true
}

module.exports = articulo
