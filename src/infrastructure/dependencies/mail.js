const path = require('path')
const {
  fromEmail,
  sqlProfileName,
  passwordEmail,
  hostEmail,
  emailPort,
  isEmailSecure
} = require('../../environment')
const { verifyEnvironment } = require('../utils/throwErrorMessage')
const nodeMailer = require('nodemailer')

const templateEmails = {
  recoverPassword: 'recuperarContrasena.html',
  validateEmail: 'validarCuenta.html',
  validateEmailEcommerce: 'validarCuentaEcommerce.html',
  datosPersonales: 'datosPersonales.html',
  solicitudes: 'solicitudes.html'
}

const verifyEnvironmentVariables = () => {
  if (!fromEmail || !sqlProfileName) {
    verifyEnvironment()
  }
}

const nodeMailerEmails = ({ transporter, mailOption }) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })

const sendEmail = async ({
  apiOption,
  emailTo,
  bodyEmail,
  ccTo = [],
  bccTo = [],
  subject = 'Correo de prueba.',
  templateData = [],
  serviceTypeEmail = 'nodeMailer',
  fileSystem,
  operationCrud,
  throwErrorMessage,
  isHtmlEmail = false,
  objTemplateEmails = {},
  attachments = []
}) => {
  verifyEnvironmentVariables()

  let structureQuery = ''

  if (apiOption) {
    structureQuery = await fileSystem.readFileAsync({
      path: path.join(
        __dirname,
        `../../../assets/${Object.keys(objTemplateEmails).length
          ? objTemplateEmails[apiOption]
          : templateEmails[apiOption]
        }`
      )
    })
  }
  if (Object.keys(templateData).length) {
    Object.keys(templateData).forEach((itemEmail) => {
      structureQuery = structureQuery.replace(
        new RegExp(`{{{${itemEmail}}}}`, 'g'),
        templateData[itemEmail]
      )
    })
  }

  if (serviceTypeEmail === 'sql') {
    const queryResponse = await operationCrud({
      optionCrud: 'useSP',
      dataQuery: {
        nameSP: 'msdb.dbo.sp_send_dbmail',
        spData: `@subject = '${subject}', @profile_name = '${sqlProfileName}', @recipients = [${emailTo.join(
          ','
        )}], @body = '${structureQuery}', @body_format = 'HTML' `
      }
    })

    if (!queryResponse.success) {
      throwErrorMessage({
        name: 'spEmailError',
        message: queryResponse.message
      })
    }

    return queryResponse
  } else if (serviceTypeEmail === 'nodeMailer') {
    const transporter = nodeMailer.createTransport({
      host: hostEmail,
      port: emailPort || 587,
      secure: isEmailSecure === true,
      proxy: 'sibsa-com-mx.mail.protection.outlook.com',
      auth: {
        user: fromEmail,
        pass: passwordEmail
      }
    })

    let mailOption = {
      from: fromEmail,
      to: emailTo,
      subject,
      cc: ccTo,
      bcc: bccTo,
      attachments
    }

    if (isHtmlEmail) {
      mailOption = {
        ...mailOption,
        html: structureQuery
      }
    } else {
      mailOption = {
        ...mailOption,
        text: bodyEmail
      }
    }

    await nodeMailerEmails({ transporter, mailOption })
  }
}

const multipleEmails = async ({
  apiOption,
  emailTo,
  serviceTypeEmail = 'nodeMailer',
  subject = 'Correo de prueba.',
  fileSystem,
  operationCrud,
  throwErrorMessage,
  attachments = []
}) => {
  verifyEnvironmentVariables()

  if (serviceTypeEmail === 'sql') {
    let structureQuery = await fileSystem.readFileAsync({
      path: path.join(
        __dirname,
        `../../../assets/${templateEmails[serviceTypeEmail][apiOption]}`
      )
    })

    emailTo.map(async (emailInfo) => {
      const { correo, templateData } = emailInfo

      Object.keys(templateData).forEach((itemEmail) => {
        structureQuery = structureQuery.replace(
          new RegExp(`{{{${itemEmail}}}}`, 'g'),
          templateData[itemEmail]
        )
      })

      const queryResponse = await operationCrud({
        optionCrud: 'useSP',
        dataQuery: {
          nameSP: 'msdb.dbo.sp_send_dbmail',
          spData: `@subject = '${subject}', @profile_name = '${sqlProfileName}', @recipients = [${correo}],  @body = '${structureQuery}', @body_format = 'HTML' `
        }
      })

      if (!queryResponse.success) {
        throwErrorMessage({
          name: 'spEmailError',
          message: queryResponse.message
        })
      }
    })
  }
}

module.exports = {
  sendEmail,
  multipleEmails
}
