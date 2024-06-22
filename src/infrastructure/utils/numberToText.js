module.exports = function numberToText (completeNumber) {
  const units = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE']
  const tens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE']
  const score = ['VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA']
  const hundreds = ['CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS']
  const thousands = ['', 'MIL', 'MILLÓN', 'MIL MILLONES']

  function getTextNumber (number) {
    if (number === 0) return ''
    if (number < 10) return units[number]
    if (number < 20) return tens[number - 10]
    if (number < 100) {
      const complemented = getTextNumber(number % 10)
      const line = complemented ? ' Y ' + complemented : complemented
      const resVen = score[Math.floor(number / 10) - 2] + line
      return resVen
    }
    if (number < 1000) return hundreds[Math.floor(number / 100) - 1] + ' ' + getTextNumber(number % 100)
    for (let i = 0; i < thousands.length; i++) {
      if (number < Math.pow(1000, i + 1)) {
        return getTextNumber(Math.floor(number / Math.pow(1000, i))) + ' ' + thousands[i] + ' ' + getTextNumber(number % Math.pow(1000, i))
      }
    }
  }

  if (isNaN(completeNumber)) return 'Número no válido'
  if (completeNumber === 0) return 'CERO'
  if (completeNumber < 0) return 'Menos ' + numberToText(-completeNumber)

  return getTextNumber(completeNumber)
}
