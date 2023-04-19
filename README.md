# Comparación entre Mongoose (MongoDB) y Sequelize (PostgreSQL)

Este proyecto ejemplo tiene como objetivo mostrar las diferencias entre Mongoose (MongoDB) y Sequelize (PostgreSQL) en un entorno de desarrollo con Node.js y Express.

## Índice

- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Diferencias entre Mongoose y Sequelize](#diferencias-entre-mongoose-y-sequelize)
- [Licencia](#licencia)

## Requisitos previos

- Node.js
- MongoDB y PostgreSQL instalados localmente o accesibles a través de la nube (ej. MongoDB Atlas, Heroku)
- NPM (instalado con Node.js)

## Instalación

1. Clona este repositorio:

    ```npm
    git clone https://github.com/your-username/mongoose-vs-sequelize.git
    ```

2. Instala las dependencias del proyecto:

    ```npm
    cd API_ORMs
    npm install
    ```

3. Configura las variables de entorno necesarias en un archivo .env en la raíz del proyecto, basándote en el archivo de ejemplo *.env.example.* Asegúrate de añadir las credenciales de conexión a MongoDB y PostgreSQL.
4. Inicia el servidor de desarrollo:
    
    ```npm
    npm run dev
    ```

## Estructura del proyecto
    
    proyecto/
    ├── mongoose/
    │   ├── models/
    │   ├── controllers/
    │   └── routes/
    ├── sequelize/
    │   ├── models/
    │   ├── controllers/
    │   └── routes/
    ├── .env.example
    ├── .gitignore
    ├── app.js
    ├── package.json
    ├── package-lock.json
    └── README.md

## Uso
Utiliza herramientas como Postman o Insomnia para probar las rutas y funciones CRUD de cada base de datos. Las rutas están diferenciadas por prefijos:

Mongoose: `/mongoose/users`
 
Sequelize: `/sequelize/users`
 
## Diferencias entre Mongoose y Sequelize
Aquí encontrarás una breve descripción de las diferencias clave entre Mongoose y Sequelize, así como sus ventajas y desventajas en términos de implementación, uso y rendimiento.

### Mongoose (MongoDB)
Descripción de las diferencias en la implementación de modelos y esquemas.
 
Ventajas y desventajas de Mongoose y MongoDB.
 
Ejemplo de uso y sintaxis.
 

### Sequelize (PostgreSQL)
Descripción de las diferencias en la implementación de modelos y relaciones.
 
Ventajas y desventajas de Sequelize y PostgreSQL.
 
Ejemplo de uso y sintaxis.
 

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más información.