# API Rest to Nekoffee 

## Introducción

Se crea API Rest para nuestro cliente el cual es dueño de la cafetería **Nekoffee** con la finalidad de que él pueda proporcionar un buen manejo de sus ordenes y productos a sus empleados.


## Historias de Usuario

#### Historia de usuario 1
* Cliente requiere bd para obtener(GET) su data en su WebApp
#### Historia de usuario 2
* Cliente requiere bd para postear o subir(POST) su data en su WebApp
#### Historia de usuario 3
* Cliente requiere bd para editar(PUT) su data en su WebApp
#### Historia de usuario 4
* Cliente requiere bd para borrar(DELETE) su data en su WebApp
#### Historia de usuario 5
* Cliente requiere que la bd tenga acceso con Token de seguridad


### Resumen del proyecto

Se crea bd con los requerimentos antes mencionados, se instalaron varias dependencias que se listaron al final de este documento.

Se crearron **endpoints** para cada necesidad del cliente(**POST**,**PUT**,**GET**,**DELETE**).

En primera instancia se hizo deploy con **NOW** pero no se pudieron crear los accesos de manera correcta(**CORS**) a la data. Posteriormente se implementó el deploy con **HEROKU** el cual tuvo buena respuesta por parte del servidor y se permitió el correcto acceso a la data.



## Dependencias

Se hizo uso de las siguientes dependencias:

* **Express**
* **bodyParser**
* **Cors**
* **crypto**
* **dotenv**
* **jest**
* **jwt-simple**
* **method-override**
* **moment**
* **mongodb**
* **mongoose**

## Deploy

* **Heroku**


## Los endpoints son:


### PRODUCTOS

* [ ] `GET /api/products`
* [ ] `GET /api/products/:productId`
* [ ] `POST /api/products`
* [ ] `PUT /api/products/:productId`
* [ ] `DELETE /api/products/:productId`

### ORDENES

* [ ] `GET /api/orders`
* [ ] `GET /api/orders/:orderId`
* [ ] `POST /api/orders`
* [ ] `PUT /api/orders/:orderId`
* [ ] `DELETE /api/orders/:ordersId`

### USER

* [ ] `POST /api/createuser`
* [ ] `POST /api/authenticate`


![Imagen Endpoints](https://i.ibb.co/8m64bzn/Captura-de-pantalla-de-2019-10-14-12-25-35.png)

