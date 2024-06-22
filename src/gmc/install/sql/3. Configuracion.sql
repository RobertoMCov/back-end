--Estos modulos son necesarios para configurar la sucursal del usuario por default 
-- $valor='baja''alta'
INSERT INTO xpCovGMCconfiguracion (Empresa, Aplicativo, Modulo, Parametro, Valor, FechaRegistro, FechaModificacion)
VALUES ('master', 'gmc', 'configSucursal', 'sucursalUsuario', $valor, GETDATE(), GETDATE())

INSERT INTO xpCovGMCconfiguracion (Empresa, Aplicativo, Modulo, Parametro, Valor, FechaRegistro, FechaModificacion)
VALUES ('master', 'gmc', 'configSucursal', 'sucursalRequerida', $valor, GETDATE(), GETDATE())

INSERT INTO xpCovGMCconfiguracion (Empresa, Aplicativo, Modulo, Parametro, Valor, FechaRegistro, FechaModificacion)
VALUES 
('master', 'gestorCRM', 'venta','movDefecto', $valor, GETDATE(), GETDATE()),
('master', 'gestorCRM', 'venta','clienteDefecto', $valorClienteDefecto, GETDATE(), GETDATE())