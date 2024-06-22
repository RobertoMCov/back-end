let { port } = require('./src/environment')
const server = require('./src/server')
port = port || 5001

const config = require('./src/infrastructure/orm/configDB')

config.initializeConnectionDB()

server.listen(port, () => {
  console.log(`API is running in port ${port}`)
})
