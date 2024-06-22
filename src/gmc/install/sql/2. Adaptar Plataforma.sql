-- Crear usuario Master
INSERT INTO xpCovGMCUsuario(Usuario, Nombre, ApellidoPaterno, ApellidoMaterno, Contrasena, Estatus, 
Correo, TipoCarga, Perfil, Empresa, FechaRegistro, FechaModificacion) VALUES ('MLejaVU-RA', 'Master', '', '', 
'$argon2id$v=19$m=4096,t=3,p=1$irYvTpww213znH+YatG9wg$BdqhEOqRcH1gM705oD0YfyOw4uD7JJLfFSTJC8DLSQI', 'alta', 'master@covalu.com', 'individual', 'master', 'master',
GETDATE(), GETDATE())

-- Crear una empresa master para asignarle al usuario master de Covalu todos los modulos
INSERT INTO xpCovGMCEmpresa (Empresa, NombreE, RFC, FechaRegistro, FechaModificacion) 
VALUES ('master', 'Master', null, GETDATE(), GETDATE())

declare @empresa varchar(20)

SET @empresa = (SELECT idXpCovGMCEmpresa from xpCovGMCEmpresa where Empresa = 'master')

-- Crear empresa-Usuario
INSERT INTO xpCovGMCEmpresaUsuario (idXpCovGMCEmpresa, Usuario, Estatus, FechaRegistro, FechaModificacion)
VALUES (@empresa, 'MLejaVU-RA', 'alta', GETDATE(), GETDATE())

-- Asignar todos los modulos al master
-- *** Buscar empresa master
DECLARE		@empresaUsuario		int,
			@idComponente		int			

SET @empresaUsuario = (Select IdXpCovGMCEmpresaUsuario from xpCovGMCEmpresaUsuario 
				      where idXpCovGMCEmpresa = (SELECT idXpCovGMCEmpresa from xpCovGMCEmpresa 
					  where Empresa = 'master'))
--SELECT @empresaUsuario

DECLARE Asignar_Modulo_GMC CURSOR  
FOR
SELECT C.IdXpCovGMCComponente
FROM xpCovGMCComponente C
where C.IdXpCovGMCComponente NOT IN (
SELECT C.IdXpCovGMCComponente from xpCovGMCEmpresaUsuarioComponente C
where estatus = 'Alta' and IdXpCovGMCEmpresaUsuario = @empresaUsuario
)
  
OPEN Asignar_Modulo_GMC -- This charges the results to memory
 
FETCH NEXT FROM Asignar_Modulo_GMC INTO @idComponente  
WHILE @@FETCH_STATUS = 0
BEGIN
 
 INSERT INTO xpCovGMCEmpresaUsuarioComponente (IdXpCovGMCEmpresaUsuario, IdXpCovGMCComponente, FechaRegistro, FechaModificacion)
 VALUES (@empresaUsuario, @idComponente, GETDATE(), GETDATE())
 
FETCH NEXT FROM Asignar_Modulo_GMC INTO @idComponente 
 
END
CLOSE Asignar_Modulo_GMC  
DEALLOCATE Asignar_Modulo_GMC 