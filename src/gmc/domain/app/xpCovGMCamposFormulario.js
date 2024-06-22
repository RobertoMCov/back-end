const { dateFormat } = require('../../../infrastructure/dependencies')

const columnNames = [
  {
    columnName: 'clave',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'nombre',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'claveFormulario',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'esRequerido',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'mostrar',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'caracteresMin',
    schema: { type: ['number'] },
    isRequired: false
  },
  {
    columnName: 'caracteresMax',
    schema: { type: ['number'] },
    isRequired: false
  },
  {
    columnName: 'tipoInput',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'orden',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'xs',
    schema: { type: ['integer'] },
    isRequired: true
  },
  {
    columnName: 'sm',
    schema: { type: ['integer'] },
    isRequired: true
  },
  {
    columnName: 'md',
    schema: { type: ['integer'] },
    isRequired: true
  },
  {
    columnName: 'lg',
    schema: { type: ['integer'] },
    isRequired: true
  },
  {
    columnName: 'identificador',
    schema: { type: ['integer'] },
    isRequired: true
  },
  {
    columnName: 'bloqueado',
    schema: { type: ['boolean'] },
    isRequired: true
  },
  {
    columnName: 'propiedades',
    schema: { type: ['string'] },
    isRequired: true
  },
  {
    columnName: 'modificarCaracteres',
    schema: { type: ['boolean'] },
    isRequired: true
  }
]

const xpCovGMCamposFormulario = {
  name: 'Campos Para Formularios',
  tableName: 'xpCovGMCamposFormulario',
  idTable: 'id',
  columns: columnNames.map((item) => item.columnName),
  columnNames,
  beforeInsert: function () {
    const sqlDate = dateFormat.getDateFormat({
      date: new Date(),
      formatDate: 'y-MM-dd HH:mm:ss'
    })

    return {
      fechaRegistro: sqlDate,
      fechaModificacion: sqlDate
    }
  },
  beforeUpdate: function () {
    const sqlDate = dateFormat.getDateFormat({
      date: new Date(),
      formatDate: 'y-MM-dd HH:mm:ss'
    })

    return {
      fechaModificacion: sqlDate
    }
  },
  arrayRelations: []
}

module.exports = xpCovGMCamposFormulario
