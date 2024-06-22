DECLARE @clave_privada VARCHAR(100) = 'clave_privada';
DECLARE @valor_encriptado VARCHAR(MAX);
DECLARE @valor_desencriptado VARCHAR(100);

SET @valor_encriptado = CONVERT(VARCHAR(MAX), ENCRYPTBYPASSPHRASE(@clave_privada, 'saludo'));
SET @valor_desencriptado = CONVERT(VARCHAR(100), DECRYPTBYPASSPHRASE(@clave_privada, @valor_encriptado));

SELECT @valor_desencriptado;
