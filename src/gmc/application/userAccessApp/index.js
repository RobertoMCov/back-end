const { generatePasswordApp, changePasswordUserApp } = require('./generatePasswordApp')
const { logInApp } = require('./loginApp')
const { recoverPasswordApp } = require('./resendEmailApp')
const {
  verifyTokenRecoverPasswordApp,
  renewPasswordApp,
  activateAccountApp
} = require('./recoverPasswordApp')

module.exports = {
  generatePasswordApp,
  logInApp,
  recoverPasswordApp,
  verifyTokenRecoverPasswordApp,
  renewPasswordApp,
  activateAccountApp,
  changePasswordUserApp
}
