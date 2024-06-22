// Insert method sql
const insertAndFetchItem = ({ tableName, dataInsert }) => {
  const dataInserted = tableName.query().insertAndFetch(dataInsert)
  return dataInserted
}

const insertItem = ({ tableName, dataInsert }) => {
  const dataInserted = tableName.query().insert(dataInsert)
  return dataInserted
}

const insertRelationItem = ({ tableName, dataInsert, allowGraphString }) => {
  return tableName.transaction(async (trx) => {
    return await tableName
      .query(trx)
      .allowGraph(allowGraphString)
      .insertGraph(dataInsert)
  })
}

module.exports = {
  insertAndFetchItem,
  insertItem,
  insertRelationItem
}
