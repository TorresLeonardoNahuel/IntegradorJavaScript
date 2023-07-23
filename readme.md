# IntegradorJavaScript

# E-Commers
1. levantar el servidor en el puerto 3000
ejecutar node ./src/app.js

## Flujo de datos de la app

### ----En el App.js esta configurada----- 
1. la ruta principal que sera /api/1.0 
2. el ruteo a routers
2. 2 middleware que generan logs, uno de errores y otro de las peticiones por req / uri

### -----En las Rutas----
1. Se mapea automaticamente las rutas segun vamos solo creando los endpoints con una funcion
2. A cada entidad y solo para POST, PATCH y DELETE se le agrego un Middleware de login, 
para ello habra que pasarle en el Header un user=admin y pass=123456

## USO

### ----------Productos-------------
1. listar Todos los productos mediante /api/1.0/productos
2. podemos buscar un producto en particular si conocemos su id(/api/1.0/productos/id)
3. si recordamos parte de su nombre o categoria podemos buscarlo por el indicio de esa palabra
ej:
/api/1.0/productos/buscar/nombre?q=apple  (traera todos los productos que contengan en el Nombre la palabra Apple)

ó

/api/1.0/productos/buscar/categoria?q=computer (traera todos los productos que contengan en la Categoria la palabra Computer)
4. Para Elimina enviamos el metodo DELETE y el id /api/1.0/productos/id  
5. Para Modificar enviamos el PATCH, el id y el body
6. Para crear enviamos por el metodo POST en el body el json del producto a /api/1.0/productos

### ----------Usuarios-------------
1. listar Todos los Usuarios mediante /api/1.0/users
2. podemos buscar un user en particular si conocemos su id(/api/1.0/users/id)
3. Para Elimina enviamos el metodo DELETE y el id a /api/1.0/users/id  
4. Para Modificar enviamos el PATCH, el id y el body a /api/1.0/users/id
5. Para crear enviamos por el metodo POST en el body el json del Usuario a /api/1.0/users
