const { throwErrorMessage } = require('./throwErrorMessage')

const verifyArrayInObject = ({ array = [], object }) => {
  array.forEach((item) => {
    if (!object[item]) {
      throwErrorMessage({
        name: 'informationNotComplete',
        message: `El campo ${item} es requerido para el endpoint`
      })
    }
  })

  return object
}

const verifyValueInObjectArray = ({ objectArray, value, errorMessage }) => {
  if (!objectArray.find((object) => object.value === value)) {
    throwErrorMessage({
      name: errorMessage,
      message: `El valor ${value} no fue encontrado.`
    })
  }
}

const clearObject = ({
  objectToClean,
  valuesToRemove = [],
  reverse = false
}) => {
  const keysObj = Object.keys(objectToClean)
  const keysToMatch = reverse
    ? valuesToRemove
    : keysObj.filter((item) => !valuesToRemove.includes(item))

  return keysToMatch.reduce(
    (acum, item) =>
      !objectToClean[item] && objectToClean[item] !== 0 && objectToClean[item] !== ''
        ? acum
        : { ...acum, [item]: objectToClean[item] },
    {}
  )
}

const getNewObj = ({ arrayNewObj, object }) => {
  let objBuild = {}

  arrayNewObj.forEach((key) => {
    objBuild = {
      [key]: object[key],
      ...objBuild
    }
  })

  return objBuild
}

const returnNullableObject = ({ body = {}, newObject = [] }) => {
  return newObject.reduce((acum, item) => {
    if (body[item]) {
      acum = { ...acum, [item]: body[item] }
    } else {
      acum = {
        ...acum,
        [item]: null
      }
    }
    return acum
  }, {})
}

const spStringResponse = ({ objectToConvert = {} }) => {
  let spString = ''
  const objectKeys = Object.keys(objectToConvert)

  objectKeys.forEach((word, index) => {
    const conditionWord = objectToConvert[word]
      ? `'${objectToConvert[word]}'`
      : objectToConvert[word]

    if (index === objectKeys.length - 1) {
      spString = `${spString} @${word} = ${conditionWord}`
    } else {
      spString = `${spString} @${word} = ${conditionWord}, `
    }
  })

  return spString
}

module.exports = {
  verifyArrayInObject,
  verifyValueInObjectArray,
  clearObject,
  getNewObj,
  returnNullableObject,
  spStringResponse
}
