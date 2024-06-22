const buildJoin = ({
  throwErrorMessage,
  arrayJoin,
  crudModels,
  envVariables,
  currentDataBase = {}
}) => {
  let queryJoin = ''
  const { database } = envVariables

  queryJoin = arrayJoin.reduce((queryJoin, columnJoin, index) => {
    const {
      joinCondition = 'INNER',
      leftCondition = {},
      rightCondition = {}
    } = columnJoin

    const leftJoinModel = crudModels[leftCondition.modelName]
    const rightJoinModel = crudModels[rightCondition.modelName]

    if (!leftJoinModel || !rightJoinModel) {
      throwErrorMessage({
        name: 'modelNotExist',
        message: `El modelo ${leftCondition.modelName} o ${rightCondition.modelName} del join no existe`
      })
    }

    const leftJoinAliasName = leftCondition.modelName
    const aliasModelLeft = `${
      leftCondition?.aliasName || leftJoinModel.tableName
    }`

    const aliasModelRight = `${
      rightJoinModel?.aliasName || rightJoinModel.tableName
    }`

    const rightTableName = `${
      !leftJoinModel?.isIntelisis
        ? `${database}.dbo.${leftJoinAliasName}`
        : `${currentDataBase.baseDatos}.dbo.${leftJoinAliasName}`
    }`

    queryJoin = `${queryJoin} ${joinCondition} JOIN ${rightTableName} ${aliasModelLeft} ON ${aliasModelRight}.${rightCondition.fieldName} = ${aliasModelLeft}.${leftCondition.fieldName}`

    if (index !== 0) queryJoin = `${queryJoin}\n`

    return queryJoin
  }, '')

  return queryJoin
}

module.exports = buildJoin
