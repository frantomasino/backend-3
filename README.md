# My App

Este es un proyecto de backend hecho con **Node.js** y **MongoDB**. La app se ejecuta en Docker, y está pensada para manejar usuarios y productos. Si estás aprendiendo a usar Docker o a trabajar con bases de datos, este proyecto puede ser útil para entender cómo hacerlo.

## Requisitos

Antes de empezar, asegúrate de tener instalados estos programas:

- **Docker**: Necesitas Docker para poder ejecutar la aplicación en un contenedor.
- **MongoDB**: La app usa MongoDB para almacenar los datos. Si no tienes MongoDB, asegúrate de tenerlo corriendo.

## Instalación

### Usar DockerHub

Puedes descargar la imagen de Docker directamente desde DockerHub sin tener que construirla tú mismo. Solo ejecuta este comando:

```bash
docker pull frantomasino/my-app:latest


1. Clona este repositorio: 

  git clone https://github.com/tu_usuario/mi-repositorio.git
  cd mi-repositorio

2. Construye la imagen de Docker con el siguiente comando:
   
   docker build -t my-app .


Ejecutar la Aplicación: 
   
   docker run -p 8080:8080 my-app


Rutas de la API:  

  
La app tiene las siguientes rutas para interactuar con ella:

GET /: Solo para chequear que todo esté funcionando.
POST /api/mocks/:users/:products: Crea un número determinado de usuarios y productos en la base de datos.
GET /api/mocks: Devuelve todos los usuarios y productos que se crearon.

Con el http://localhost:8080/api/mocks: 

 Ver todos los productos y usuarios creados 





Conexión con MongoDB:  

La app guarda los datos en MongoDB. 
Asegúrate de tener la base de datos configurada correctamente. 
Usa la variable de entorno MONGO_URI en tu archivo .env para la conexión.

Resumen:
npm start: Inicia la aplicación (servidor Express).
npm test: Ejecuta las pruebas (test unitarios o de integración).
Si lo que deseas es correr tu servidor, usas npm start. Si necesitas probar tu código (es decir, ejecutar las pruebas), usas npm test.