// Delete method sql
const deleteInformationById = ({ tableName, dataDelete }) => {
  const itemsDeleted = tableName.query().deleteById(dataDelete)
  return itemsDeleted
}

const deleteInformation = ({ tableName, dataWhere = {} }) => {
  const itemsDeleted = tableName.query().delete()
  if (Object.keys(dataWhere).length) itemsDeleted.where(dataWhere)
  return itemsDeleted
}

module.exports = {
  deleteInformationById,
  deleteInformation
}
