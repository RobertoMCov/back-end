const { catalogs } = require('../../catalog/application')
const templates = require('../qrTemplates')

const generate = async ({ system, body }) => {
  const { dependencies, utils } = system
  const { qrCode, htmlToImage, fileSystem } = dependencies

  const template = templates[body?.template]

  if (!template) {
    utils.throwErrorMessage({
      name: 'noTemplateAllow',
      message: 'Seleccione una template adecuada'
    })
  }

  const dataCatalog = {
    catalogName: template.model,
    queryParams: body,
    system
  }

  const getData = await catalogs.getCatalog(dataCatalog)
  getData.catalogData?.length > 1 &&
    utils.throwErrorMessage({
      name: 'moreThanOneResult',
      message: 'Hay mas de un registro'
    })

  const dataToTemplate = getData.catalogData[0] || {}

  const getQRString = await qrCode.generateQrCodeString({
    qrText: template.formatQR({ ...dataToTemplate, ...body })
  })

  const templateQRCode = await fileSystem.readFileAsync({ path: template.templateHtml })

  let imageBuffer = await htmlToImage.htmlToImageBuffer({
    htmlCode: templateQRCode,
    objContent: {
      ...template.fillTemplate({ ...dataToTemplate, ...body }),
      codigoQR: getQRString
    }
  })
  imageBuffer = imageBuffer.toString('base64')

  return imageBuffer
}

module.exports = generate
