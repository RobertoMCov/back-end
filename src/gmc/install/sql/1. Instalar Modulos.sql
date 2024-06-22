-- Crear el aplicativo Gestor Multiplataforma Covalu 
INSERT INTO xpCovGMCAplicativo (Aplicativo, DescripcionA, Estatus, FechaRegistro, FechaModificacion)
VALUES ('gmc', 'Gestor Multiplataforma Covalu', 'alta', GETDATE(), GETDATE())

-- Crear base de datos para el gestor 

DECLARE
	@dbPasswordGMC			varchar(50)

SET @dbPasswordGMC = 'Covalu_master_2022'

INSERT INTO xpCovGMCBaseDatos (Aplicativo, Servidor, BaseDatos, Usuario, Contrasena, FechaRegistro, FechaModificacion)
VALUES ('gmc', $servidor, $baseDatos, $usuario, ENCRYPTBYPASSPHRASE(@dbPasswordGMC,$contrasena), GETDATE(), GETDATE())

--Validar encriptación de contraseña bd
--select *, CONVERT(varchar, DECRYPTBYPASSPHRASE(@dbPasswordGMC,Contrasena)) from xpCovGMCBaseDatos

-- Crear modulos del aplicativo GMC

INSERT INTO xpCovGMCModulo (Modulo, Aplicativo, DescripcionM, FechaRegistro, FechaModificacion, Estatus)
VALUES ('sucursales', 'gmc', 'Sucursales', GETDATE(), GETDATE(), 'Alta'),
	   ('usuarios', 'gmc', 'Usuarios', GETDATE(),  GETDATE(), 'Alta'),
	   ('empresas', 'gmc', 'Empresas para el aplicativo', GETDATE(),  GETDATE(), 'Alta')

-- Crear componente para los modulos del aplicativo GMC

-- Sucursales	 

DECLARE 
	@idBranchOffice		int

SET @idBranchOffice = (Select IdXpCovGMCModulo from xpCovGMCModulo where Modulo = 'sucursales')

INSERT INTO xpCovGMCComponente (IdXpCovGMCModulo, Componente, DescripcionC, FechaRegistro, FechaModificacion)
VALUES (@idBranchOffice, 'verSucursales', 'Visualizacion de sucursales', GETDATE(),  GETDATE())

-- Usuarios
DECLARE 
	@idUsers		int

SET @idUsers = (Select IdXpCovGMCModulo from xpCovGMCModulo where Modulo = 'usuarios')

INSERT INTO xpCovGMCComponente (IdXpCovGMCModulo, Componente, DescripcionC, FechaRegistro, FechaModificacion)
VALUES (@idUsers, 'verUsuarios', 'Visualizacion de los usuarios de la plataforma', GETDATE(),  GETDATE())
	   --(@idUsers, 'nuevoUsuario', 'Agregar usuarios a la plataforma', GETDATE(),  GETDATE()),
	   --(@idUsers, 'asignarComponentes', 'Asignacion de componentes a los usuarios', GETDATE(),  GETDATE()),
	   --(@idUsers, 'bajaUsuario', 'Dar de baja un usuario', GETDATE(),  GETDATE())

-- Licenciamiento
DECLARE 
	@idBusiness		int

SET @idBusiness = (Select IdXpCovGMCModulo from xpCovGMCModulo where Modulo = 'empresas')

INSERT INTO xpCovGMCComponente (IdXpCovGMCModulo, Componente, DescripcionC, FechaRegistro, FechaModificacion)
VALUES (@idBusiness, 'verEmpresas', 'Visualizacion de las empresas del cliente', GETDATE(),  GETDATE())

