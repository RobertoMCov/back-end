const { generatePassword, changePasswordUser } = require('./generatePassword')
const { logIn } = require('./login')
const { recoverPassword } = require('./resendEmail')
const {
  verifyTokenRecoverPassword,
  renewPassword,
  activateAccount
} = require('./recoverPassword')

module.exports = {
  generatePassword,
  logIn,
  recoverPassword,
  verifyTokenRecoverPassword,
  renewPassword,
  activateAccount,
  changePasswordUser
}
