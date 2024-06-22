module.exports = {
  getInfoBuildQuery: {
    name: 'Traer información de un recurso',
    urlPath: '/:catalogName'
  },
  createResource: {
    name: 'Crear un registro del recurso indicado.',
    urlPath: '/'
  },
  upsertCatalog: {
    name: 'Crear y actualizar campos de un recurso.',
    urlPath: '/upsert/:catalog'
  },
  updateResource: {
    name: 'Actualizar campos de un recurso.',
    urlPath: '/actualizar/:catalog'
  }
}
