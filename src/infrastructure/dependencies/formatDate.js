const dateFNS = require('date-fns')
const { format, addHours } = dateFNS
const { es } = require('date-fns/locale')
const isValid = require('date-fns/isValid')
const differenceInMinutes = require('date-fns/differenceInMinutes')
const differenceInHours = require('date-fns/differenceInHours')
const getMinutes = require('date-fns/getMinutes')
const getHours = require('date-fns/getHours')

const differenceTime = {
  differenceInMinutes,
  differenceInHours
}
const getObjTime = {
  getMinutes,
  getHours
}

const dateFormatConfig = {
  locale: es
}

const getDateFormat = ({ date, formatDate }) => {
  return format(new Date(date), formatDate, dateFormatConfig)
}

const dateIsValid = ({ date }) => isValid(new Date(date))

const timeZone = ({ date }) => {
  const objDate = new Date(date)
  const timeZoneDay = objDate.getHours() + 6
  objDate.setHours(timeZoneDay)
  return objDate
}

const addHoursFTS = ({ dateOrTime, hours }) => {
  return addHours(new Date(dateOrTime), hours)
}

const getDifferenceTime = ({
  firstData,
  secondData,
  differenceTimeMethod = 'differenceInMinutes'
}) => {
  return differenceTime[differenceTimeMethod](firstData, secondData)
}

const getTime = ({ currentDate = new Date(), timeMethod = '' }) => {
  return getObjTime[timeMethod](new Date(currentDate))
}

module.exports = {
  dateIsValid,
  getDateFormat,
  timeZone,
  addHoursFTS,
  getDifferenceTime,
  getTime
}
