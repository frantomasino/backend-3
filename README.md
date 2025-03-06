## My App

Este es un proyecto de backend hecho con **Node.js** y **MongoDB**. La app se ejecuta en Docker, y está pensada para manejar usuarios y productos. Si estás aprendiendo a usar Docker o a trabajar con bases de datos, este proyecto puede ser útil para entender cómo hacerlo.

## Requisitos

Antes de empezar, tener instalados estos programas:

- **Docker**: Necesitas Docker para poder ejecutar la aplicación en un contenedor.
- **MongoDB**: La app usa MongoDB para almacenar los datos. Si no tienes MongoDB, asegúrate de tenerlo corriendo.

## Instalación

### Usar DockerHub

Podes descargar la imagen de Docker directamente desde DockerHub sin tener que construirla tú mismo. Solo ejecuta este comando:

```bash
docker pull frantomasino/my-app:latest

1: Clona este repositorio: 
 
git clone https://github.com/tu_usuario/mi-repositorio.git
cd mi-repositorio


2 Construye la imagen de Docker con el siguiente comando:
 
 docker build -t my-app .

Ejecutar la Aplicación
Para ejecutar la aplicación en Docker, usa el siguiente comando:

docker run -p 8080:8080 my-app



Usar npm start: 
Si prefieres no usar Docker, puedes ejecutar la aplicación localmente usando Node.js y MongoDB.: npm start

http://localhost:8080/api-docs  --  API generada con Swagger. 


Usar npm test: 
Ejecutará las pruebas con Mocha y te mostrará los resultados en la consola.: npm test


La app tiene las siguientes rutas para interactuar con ella:

GET /: Solo para chequear que todo esté funcionando.
POST /api/mocks/:users/:products: Crea un número determinado de usuarios y productos en la base de datos.
GET /api/mocks: Devuelve todos los usuarios y productos que se crearon.
DELETE /api/mocks: Elimina todos los usuarios.


 ## Railway 
     Para que te traiga todo los productos es 
     https://backend-3-production.up.railway.app/api/mocks 