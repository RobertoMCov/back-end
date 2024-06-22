const dotenv = require('dotenv')
const envVars = process.env
const path = require('path')
const envFile = `${process.env.NODE_ENV || ''}.env`.replace(/ /g, '')
const envFileRoot = path.resolve(__dirname, '../')

dotenv.config({
  path: path.resolve(envFileRoot, envFile)
})

module.exports = {
  host: envVars.LHI_HOST,
  user: envVars.LHI_USER,
  password: envVars.LHI_PASSWORD,
  database: envVars.LHI_SERVER,
  portDatabase: envVars.LHI_PORT,
  instanceNameDatabase: envVars.LHI_INSTANCE_NAME,
  port: envVars.PORT,
  secret: envVars.KEY,
  fromEmail: envVars.EMAIL_FROM,
  passwordEmail: envVars.PASSWORD_EMAIL,
  publicBackend: envVars.PUBLIC_BACKEND,
  publicFrontEnd: envVars.PUBLIC_FRONTEND,
  sqlProfileName: envVars.SQL_PROFILE_NAME,
  sqlPhrase: envVars.SQL_PHRASE,
  hostEmail: envVars.HOST_EMAIL,
  pathFiles: envVars.PATH_FILES,
  pathFilesIndividual: envVars.PATH_FILES_INDIVIDUAL,
  locationConfig: envVars.LOCATION_CONFIG === 'true',
  emailPort: parseInt(envVars.EMAIL_PORT) || 587,
  isEmailSecure: envVars.IS_EMAIL_SECURE === 'true',
  publicFolder: envVars.PUBLIC_FOLDER,
  passwordLength: envVars.PASSWORD_LENGTH || 12,
  folderArtImages: envVars.FOLDER_ART_IMAGES,
  folderProspectRealStateFiles: envVars.FOLDER_PROSPECT_REALSTATE_FILES,
  apiArtImages: '/crm/art/images'
}
