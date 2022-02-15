# About

El objetivo del proyecto es mostrar una api REST desarrollada con Node.js, MongoDB, Express y Supertest. 

# Getting Started

Levantamos el servidor de base de datos instalado localmente con:

``` console
lulu:~ lstabile$ mongod --config /opt/homebrew/etc/mongod.conf
```

Para ejecutar las pruebas vamos al directorio del proyecto y ejecutamos el siguiente comando:

``` console
lulu:backend lstabile$ npm test
```

Para levantar el servidor en desarrollo ejecutamos:

``` console
lulu:backend lstabile$ npm start
```

Finalmente, para hacer uso de la API podemos instalarnos alguna herramienta como _Insomnia_ y realizar un request a la [http://127.0.0.1:5000/api/v1/blogpost/?title=ejemplo](http://127.0.0.1:5000/api/v1/blogpost/?title=ejemplo) en donde estaríamos buscando posteos del blog que contengan en el título la palabra _ejemplo_.
