const { ConectaEspecialidades, ConectaEstudios, ConectaSesiones, ConectaPlaticas } = require("../../domain/app")

const getOpcionesCita = async ({ system }) => {
  const { operationCrud } = system

  const especialidades = await operationCrud({
    tableName: ConectaEspecialidades,
    optionCrud: 'read',
    dataQuery: {
      dataSelect: ['idEspecialidad', 'nombre'],
    }
  })

  const estudios = await operationCrud({
    tableName: ConectaEstudios,
    optionCrud: 'read',
    dataQuery: {
      dataSelect: ['idEstudio', 'nombre'],
    }
  })

  const sesiones = await operationCrud({
    tableName: ConectaSesiones,
    optionCrud: 'read',
    dataQuery: {
      dataSelect: ['idSesion', 'nombre'],
    }
  })

  const platicas = await operationCrud({
    tableName: ConectaPlaticas,
    optionCrud: 'read',
    dataQuery: {
      dataSelect: ['idPlatica', 'nombre'],
    }
  })

  return {
    especialidades,
    estudios,
    sesiones,
    platicas
  }
}

module.exports = {
  getOpcionesCita
}
