```
|- assets
    |- nombrePlataforma
        |- nombreArchivo.html
|- public
    |- nombrePlataforma
        |- nombreAplicacion.apk
|- src
    |- crud (recurso que manejará los endpoints de crear, leer, actualizar y eliminar)
    |- gmc
        |- install
            |- modeloER
            |- alterSql
                |- nombreFlujo.sql
            |- sql
                |- modulos.sql
                |- adaptarPlataforma.sql
        |- application
            |- nombreRecurso (user)
                |- nombreAccionPrincipal (register)
                    |- nombreAccionSecundaria.js (registerManyUsers.js)
                    |- index.js
            |- appNombreRecurso (user)
                |- nombreAccionPrincipal (register)
                    |- nombreAccionSecundaria.js (registerManyUsers.js)
                    |- index.js
        |- domain
            |- app (modelos de la plataforma)
                |- nombreFlujo
                    |- nomTabla.js
            |- intelisis (modelos de intelisis)
                |- nombreFlujo
                    |- nomTabla.js

        |-routes
            |- nombreFlujo
                |- nombreRecurso
                    |- endpointUrl.js
                    |- index.js
                |- index.js
    |- infrastructure
        |- dependencies
            |- nombreDependencia.js
            |- index.js
        |- middleware 
            |- auth.js
            |- uploadFiles
        |- orm
        |- utils
        server.js
|- .env
|- .gitignore
|- .huskyrc.js
|- ecosystem.config
|- index.js

```

**1. Nota:**

- Los manuales y formatos se guardaran dentro de Desarrollo oficina en teams
- Ocupar la depedencia de TODO y agregar algún comentario para **agregar campos o alters** más adelante.
- Los alter tienen que estar comentados
- Por cada query agregado en la carpeta de sql, agregar un comentario del por que de dicha línea.
- Agregar la url de la app en el portal

**2. Modelos**

- Si existen "tablas gemelas (es decir, misma estructura de datos en intelisis y la plataforma intermedia)", el modelo principal debe de vivir en la carpeta de intelisis. En caso de modificar la información para los modelos de la plataforma, es necesario crear una carpeta llamada **adapter**, donde se podrá modificar la información de dicho modelo de la plataforma.

**3. Nota para manejo de funciones usadas por cualquier plataforma**

- En el momento que se requiera el uso de un caso de uso de algún recurso en otro, es necesario agregar un package.json con la key **name:nombrePaquete**
