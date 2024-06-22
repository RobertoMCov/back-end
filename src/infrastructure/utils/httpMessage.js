const httpTrue = ({ res, data, message }) => {
  res.json({
    success: true,
    message: `${message} ✅`,
    payload: data
  })
}

const validationTruncateFields = (error) => {
  const errorMessage = error.toString()
  const startString = 'Truncated value:'
  if (errorMessage.includes(startString)) {
    const errorM = errorMessage.slice(errorMessage.indexOf(startString) + 18, -2)
    const message = `Valor supera ${errorM?.length} caracteres, sugerido: ${errorM}`
    return {
      name: 'length size field',
      message
    }
  }
  return error
}

const httpFalse = ({ res, error, message, code }) => {
  res.status(code)
  res.json({
    success: false,
    message: `${message} ❌`,
    payload: { error: validationTruncateFields(error) }

  })
}

module.exports = {
  httpTrue,
  httpFalse
}
