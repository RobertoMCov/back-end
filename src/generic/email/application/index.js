const emailSend = async ({ system, body, attachments = [] }) => {
  const { dependencies, utils, operationCrud } = system
  const { mail, fileSystem } = dependencies
  const { object, throwErrorMessage } = utils
  const { xpCovAPVProspectoPlantillaEtapaActividad } = require('../../../ventas/domain/app')
  object.verifyArrayInObject({
    array: ['mensaje'],
    object: body
  })

  const { para, cc = [], asunto, mensaje, cco = [] } = body

  const paraString = para.join(',')
  const ccString = cc.join(',')
  const ccoString = cco.join(',')

  const newEmailRegister = await operationCrud({
    tableName: xpCovAPVProspectoPlantillaEtapaActividad,
    optionCrud: 'create',
    dataQuery: {
      dataInsert: { ...body, cc: ccString, cco: ccoString, para: paraString }
    }
  })

  await mail.sendEmail({
    emailTo: paraString,
    ccTo: ccString,
    bccTo: ccoString,
    bodyEmail: mensaje,
    subject: asunto,
    fileSystem,
    operationCrud,
    throwErrorMessage,
    attachments
  })

  return {
    sentEmail: true,
    newEmailRegister
  }
}

module.exports = {
  emailSend
}
