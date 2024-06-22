const columnNames = [
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'direccion',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'direccionNumero',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'direccionNumeroInt',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'delegacion',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'colonia',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'poblacion',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'codigoPostal',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estado',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'rfc',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'email1',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'categoria',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'grupo',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'familia',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'telefonos',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'estatus',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'condicion',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const empresa = {
  name: 'Catálogo de clientes intelisis',
  tableName: 'cte',
  idTable: 'cliente',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  searchableColumns: ['nombre', 'cliente'],
  isIntelisis: true
}

module.exports = empresa
