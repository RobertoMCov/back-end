const express = require('express')
const cors = require('cors')
const app = express()
const { system } = require('./commons/mainConfig')

app.use(cors())
app.use(express.json())

const crudResource = require('./generic/crud/routes')
const catalogResource = require('./generic/catalog/routes')
const qrCode = require('./generic/qrCode/routes')
const dynamicBuildQuery = require('./generic/buildQuery/routes')
const emailSent = require('./generic/email/routes')
const fileSent = require('./generic/filesSend/routes')
const commonInfo = require('./generic/commonInfo/routes')
const gmcEndpoints = require('./gmc/routes')
gmcEndpoints({ app, system })

app.use('/crud-recurso', crudResource({ app, system }))
app.use('/catalogo', catalogResource({ app, system }))
app.use('/qr', qrCode({ app, system }))
app.use('/query', dynamicBuildQuery({ app, system }))
app.use('/email', emailSent({ app, system }))
app.use('/filesSend', fileSent({ app, system }))
app.use('/informacion-compartida', commonInfo({ app, system }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is Running'
  })
})

module.exports = app
