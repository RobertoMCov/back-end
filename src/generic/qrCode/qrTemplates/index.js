const path = require('path')

module.exports = {
  wmsPositions: {
    templateHtml: path.join(__dirname, '../../../../assets/wms/wmspositions.html'),
    fillTemplate: ({ descripcion, posicion }) => ({ descripcion, posicion }),
    formatQR: ({ posicion, descripcion }) => `posicion=${posicion};descripcion=${descripcion}`,
    model: 'almPos'
  }

}
