const lowerValuesObject = ({ objectToLower = {} }) => {
  return Object.keys(objectToLower).reduce(
    (accum, key) =>
      objectToLower[key]
        ? {
            ...accum,
            [key]:
              typeof objectToLower[key] === 'string'
                ? objectToLower[key].toLowerCase()
                : objectToLower[key]
          }
        : accum,
    {}
  )
}

const capitalizeWords = ({ word }) => {
  if (typeof word !== 'string') return ''
  word = word.toLowerCase().split(' ')
  word = word
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  return word
}

const clearArray = ({ valuesToRemove = [], arrayToClean }) => {
  return arrayToClean.reduce((acum, item) => {
    if (!valuesToRemove.includes(item)) acum = [...acum, item]
    return acum
  }, [])
}

const convertOneWord = ({ word }) => {
  let stringCapitalizeWord = word.split(' ')
  stringCapitalizeWord = stringCapitalizeWord.map((word) => capitalizeWords({ word }))
  return stringCapitalizeWord.join('')
}

module.exports = {
  lowerValuesObject,
  capitalizeWords,
  clearArray,
  convertOneWord
}
