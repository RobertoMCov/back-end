// Update method sql
const updateInformation = ({ tableName, dataUpdate, dataWhere }) => {
  const dataFound = tableName.query().patch(dataUpdate).where(dataWhere)
  return dataFound
}

module.exports = {
  updateInformation
}
