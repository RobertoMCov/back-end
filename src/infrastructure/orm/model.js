const { database } = require('../../environment')
const { Model } = require('objection')
const { verifyEnvironment } = require('../utils/throwErrorMessage')

const verifyTableName = ({
  tableName,
  defaultEnvironment = {},
  dataModel = {}
}) => {
  if (!database || !database) verifyEnvironment()

  return dataModel?.isIntelisis
    ? `${defaultEnvironment.connection.database}.dbo.${tableName}`
    : `${database}.dbo.${tableName}`
}

const buildModel = ({
  objectTable,
  objModifiers = {},
  defaultEnvironment = {}
}) => modelDB({ dataModel: objectTable, objModifiers, defaultEnvironment })

const modelDB = ({ dataModel, objModifiers = {}, defaultEnvironment = {} }) => {
  const {
    tableName,
    idTable,
    beforeInsert = function () { },
    beforeUpdate = function () { },
    arrayRelations = []
  } = dataModel

  const model = class ModelDB extends Model {
    $beforeInsert () {
      const obkCreate = beforeInsert()
      for (const key in obkCreate) {
        this[key] = obkCreate[key]
      }
    }

    $beforeUpdate () {
      const objBeforeUpdate = beforeUpdate()
      for (const key in objBeforeUpdate) {
        this[key] = objBeforeUpdate[key]
      }
    }

    static get idColumn () {
      return idTable
    }

    static get tableName () {
      return verifyTableName({ tableName, defaultEnvironment, dataModel })
    }

    static relationMappings () {
      const buildRelations = arrayRelations.reduce(
        (
          acum,
          { relationName, relationModel, modelClass, joinFrom, joinTo }
        ) => {
          const objJoin = {
            from: `${verifyTableName({
              tableName: joinFrom.tableName,
              defaultEnvironment,
              dataModel
            })}.${joinFrom.keyJoinFrom}`,
            to: `${verifyTableName({
              tableName: joinTo.tableName,
              defaultEnvironment,
              dataModel
            })}.${joinTo.keyJoinTo}`
          }

          acum = {
            ...acum,
            [relationName]: {
              relation: Model[relationModel],
              modelClass: buildModel({
                objectTable: modelClass,
                objModifiers,
                defaultEnvironment
              }),
              join: objJoin
            }
          }

          return acum
        },
        {}
      )

      return buildRelations
    }
  }

  return model
}

module.exports = {
  modelDB,
  Model
}
