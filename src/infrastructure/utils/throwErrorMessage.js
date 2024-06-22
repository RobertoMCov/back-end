const throwErrorMessage = ({ name, message }) => {
  function ErrorMessage ({ name, message }) {
    this.name = name
    this.message = message
  }
  throw new ErrorMessage({
    name,
    message
  })
}

const verifyEnvironment = () => {
  throwErrorMessage({
    name: 'withoutEnvironment',
    message: 'No se encuentra la variable de entorno'
  })
}

module.exports = { throwErrorMessage, verifyEnvironment }
