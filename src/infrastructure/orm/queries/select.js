const { raw } = require('objection')

const selectInformation = (params) => {
  const {
    tableName = '',
    dataSelect = ['1'],
    dataWhere = {},
    limit = 0,
    count,
    arrayOrderBy = [],
    optionRelatedJoin = '',
    joinRelated = '',
    dataSelectJoinRelated = [],
    objModifiers = {},
    arrayWhereIn = [],
    dataNotNull = [],
    objWhereNot = {},
    havingCount = {},
    groupBy = '',
    arrayWhereNotIn = {},
    likeValues = [],
    whereBetweenValues,
    pager = {},
    distinct = false,
    whereRaw,
    arrayWhereNull = [],
    alias = ''
  } = params

  const dataQueryOperation = tableName.query()

  if (distinct) dataQueryOperation.distinct(distinct)
  if (count) {
    dataQueryOperation.select(
      raw('count (1) as totalRecords')
    )
  }

  if (dataSelectJoinRelated.length) dataQueryOperation.select(dataSelectJoinRelated)
  else if (!count && dataSelect.length) dataQueryOperation.select(raw(dataSelect.map((select) => select).join(',')))

  if (alias) dataQueryOperation.alias(alias)

  if (Object.keys(dataWhere).length) dataQueryOperation.where(dataWhere)
  if (likeValues.length) {
    dataQueryOperation.where(function () {
      const dataWhere = this.where(
        likeValues[0].field,
        'like',
        `%${likeValues[0].value}%`
      )
      likeValues.forEach((item, index) => {
        if (index) {
          dataWhere.orWhere(item.field, 'like', `%${item.value}%`)
        }
      })
    })
  }

  if (limit) dataQueryOperation.limit(limit)

  if (arrayWhereIn.length) {
    arrayWhereIn.forEach((item) => dataQueryOperation.whereIn(item[0], item[1]))
  }

  if (whereBetweenValues) {
    dataQueryOperation.whereBetween(
      raw(`CONVERT(varchar,${whereBetweenValues[0]},23)`),
      whereBetweenValues[1]
    )
  }

  if (arrayWhereNull.length) {
    arrayWhereNull.forEach((item) => {
      if (item?.typeNull === 'or') {
        dataQueryOperation.orWhereNull(item.column)
      } else {
        dataQueryOperation.whereNull(item.column)
      }
    })
  }

  if (groupBy) dataQueryOperation.groupBy(groupBy)

  if (optionRelatedJoin && joinRelated && ['withGraphFetched', 'withGraphJoined', 'joinRelated'].includes(optionRelatedJoin)) { dataQueryOperation[optionRelatedJoin](joinRelated) }

  if (Object.keys(objModifiers).length) {
    dataQueryOperation.modifiers(objModifiers)
  }

  if (dataNotNull.length) {
    dataNotNull.forEach((notNull) => {
      dataQueryOperation.whereNotNull(notNull)
    })
  }

  if (Object.keys(objWhereNot).length) dataQueryOperation.whereNot(objWhereNot)

  if (Object.keys(havingCount).length) {
    const { column, operator, value } = havingCount
    dataQueryOperation.having(raw(column), operator, value)
  }

  if (Object.keys(arrayWhereNotIn).length) {
    arrayWhereNotIn.forEach((item) => {
      const { column, arrayWhereNot, whereNotOption = 'whereNotIn' } = item
      dataQueryOperation[whereNotOption](column, arrayWhereNot)
    })
  }

  if (Object.keys(pager).length) {
    dataQueryOperation
      .orderBy(
        !arrayOrderBy.length
          ? [{ column: tableName.idColumn, order: 'asc' }]
          : arrayOrderBy
      )
      .offset(pager.start)
      .limit(pager.totalRecordsByPage)
    return dataQueryOperation
  }

  if (arrayOrderBy.length) dataQueryOperation.orderBy(arrayOrderBy)
  if (whereRaw) dataQueryOperation.whereRaw(whereRaw)

  return dataQueryOperation
}

module.exports = {
  selectInformation
}
