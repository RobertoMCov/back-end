const argon2 = require('argon2')
const { nanoid } = require('nanoid')
const generator = require('generate-password')
const jwt = require('jsonwebtoken')
const { secret } = require('../../environment')
const { verifyEnvironment } = require('../utils/throwErrorMessage')

const generateKey = ({ lengthKey }) => {
  return nanoid(lengthKey)
}

const encrypt = async ({ password }) => {
  return await argon2.hash(password)
}

const encryptVerify = async ({ valueEncrypt, unEncryptedValue }) => {
  return await argon2.verify(valueEncrypt, unEncryptedValue)
}

const jwtCreate = ({ data, expiresIn }) => {
  if (!secret) verifyEnvironment()

  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, { expiresIn }, (error, token) => {
      if (error) return reject(error)
      resolve(token)
    })
  })
}

const jwtVerify = ({ token }) => {
  if (!secret) verifyEnvironment()

  return new Promise((resolve) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) return resolve(false)
      return resolve(decoded)
    })
  })
}

const randomPassword = ({ length }) => {
  return generator.generate({
    length,
    numbers: true
  })
}

module.exports = {
  encrypt,
  generateKey,
  encryptVerify,
  jwtCreate,
  jwtVerify,
  randomPassword
}
