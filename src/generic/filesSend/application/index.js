const fileSend = async ({ system, attachments = [] }) => {
  const { dependencies, operationCrud } = system
  const { fileSystem } = dependencies
  const { pathFilesIndividual } = require('../../../environment')
  const { xpCovChocolate } = require('../../../ventas/domain/app')

  const filesToInsert = await Promise.all(attachments.map(async (file) => {
    const { originalname, mimetype, buffer } = file
    const pathFile = `${pathFilesIndividual}\\Archivos\\${originalname}`
    const verifyFolder = await fileSystem.verifyAsyncFs({ path: pathFile })
    if (!verifyFolder) {
      await fileSystem.createFolderAsync({ path: pathFile })
    }
    const rutaArchivo = `${pathFile}\\${originalname}`
    await fileSystem.writeStream({ path: rutaArchivo, file: buffer })
    return {
      nombreArchivo: originalname,
      formatoArchivo: mimetype,
      rutaArchivo
    }
  }))

  const addFiles = await Promise.all(attachments.map(async (file) => {
    const { buffer, originalname } = file
    return {
      filename: originalname,
      content: buffer
    }
  }))

  const newFileInserted = await operationCrud({
    tableName: xpCovChocolate,
    optionCrud: 'create',
    dataQuery: {
      dataInsert: filesToInsert
    }
  })

  return {
    sentFile: true,
    newFileInserted,
    addFiles
  }
}

module.exports = {
  fileSend
}
