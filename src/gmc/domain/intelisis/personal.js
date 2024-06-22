const columnNames = [
  {
    columnName: 'empresa',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'apellidoPaterno',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'apellidoMaterno',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'registro',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'registro2',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'registro3',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'email',
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
    columnName: 'poblacion',
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
    columnName: 'telefono',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'beneficiario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'parentesco',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'reportaA',
    schema: { type: ['string'] },
    isRequired: true
  }
]

const personal = {
  name: 'Catálogo de personal',
  tableName: 'personal',
  idTable: 'personal',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  isIntelisis: true
}

module.exports = personal
