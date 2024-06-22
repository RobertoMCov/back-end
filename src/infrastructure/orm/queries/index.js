const dataSelect = require('./select')
const dataInsert = require('./insert')
const dataUpdate = require('./update')
const storeP = require('./useSP')
const dataDelete = require('./delete')

module.exports = {
  ...dataInsert,
  ...dataSelect,
  ...dataUpdate,
  ...storeP,
  ...dataDelete
}
