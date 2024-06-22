const excelToJson = require('convert-excel-to-json')

const convertExcelToJson = ({ file = {}, configJson = {} }) => {
  return excelToJson({
    source: file.buffer,
    header: {
      rows: 1
    },
    ...configJson
  })
}

const csvToArray = ({ csvBuffer }) => {
  csvBuffer = csvBuffer.buffer.toString().toLowerCase().split('\r\n')
  return csvBuffer.filter((item, index) => item !== null && index !== 0)
}

module.exports = {
  convertExcelToJson,
  csvToArray
}
