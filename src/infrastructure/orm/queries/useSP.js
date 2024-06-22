const { throwErrorMessage } = require('../../utils')
const { appDB } = require('../configDB')

const useSP = async ({
  nameSP,
  arrValues = [],
  appDBConnection = '',
  spData
}) => {
  let dataResult = null
  const expSizeValues = Array(arrValues.length).fill('?')
  try {
    let connection = appDB

    if (appDBConnection) {
      connection = appDBConnection
    }

    if (arrValues.length) {
      dataResult = await connection.raw(
        `EXEC ${nameSP} ${spData || expSizeValues} `,
        arrValues
      )
    } else {
      dataResult = await connection.raw(
        `EXEC ${nameSP} ${spData || expSizeValues} `
      )
    }

    return {
      success: true,
      dataResult
    }
  } catch (error) {
    return {
      success: false,
      message: error || 'Error en SP'
    }
  }
}

const useQueryProcedure = ({
  query,
  appDBConnection,
  internalError = false
}) => {
  let connection = appDB

  if (appDBConnection) {
    connection = appDBConnection
  }
  const queryToExec = internalError
    ? `DECLARE @Error VARCHAR(MAX), @Mensaje VARCHAR(MAX)
SET @Mensaje='SUCCESS'
  BEGIN TRY
  BEGIN TRANSACTION 
    ${query}
    COMMIT
  END TRY
  BEGIN CATCH
  ROLLBACK TRANSACTION
  SELECT @Error = ERROR_LINE(), @Mensaje = ERROR_MESSAGE()
  END CATCH
  SELECT @Error AS error, @Mensaje AS message
`
    : query

  try {
    return connection.raw(queryToExec)
  } catch (error) {
    return [
      {
        error: true,
        message: error || 'Error en SP'
      }
    ]
  }
}

const useQuery = async (useQueryData) => {
  const response = await useQueryProcedure(useQueryData)
  response.forEach((element, index) => {
    const objKeys = Object.keys(element)
    if (objKeys.includes('errorLine')) {
      throwErrorMessage({
        name: 'useQueryError',
        message: response[index]
      })
    }
  })
  return response
}

module.exports = { useSP, useQuery }
