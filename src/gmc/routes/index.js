const accessUserRoutes = require('./userAccess')
const userAccessRoutesApp = require('./userAccessApp')
const accessLoginRegisterRoutes = require('./registerUser')
const accessLoginRegisterRoutesApp = require('./registerUserApp')
const appBranchOfficeRoutes = require('./configuration')
const gmcMainViewsRoutes = require('./gmcMainViews')

const gmcEndpoints = ({ app, system }) => {
  const platformName = 'gmc'

  app.use(`/${platformName}/acceso-usuario`, accessUserRoutes({ system }))
  app.use(`/${platformName}/acceso-usuario-app`, userAccessRoutesApp({ system }))
  app.use(`/${platformName}/registro`, accessLoginRegisterRoutes({ system }))
  app.use(`/${platformName}/registro-app`, accessLoginRegisterRoutesApp({ system }))
  app.use(`/${platformName}/configuracion`, appBranchOfficeRoutes({ system }))
  app.use(`/${platformName}/vistas-gmc`, gmcMainViewsRoutes({ system }))
}

module.exports = gmcEndpoints
