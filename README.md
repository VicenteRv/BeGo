# Funcionalidad de la API

Esta api esta tiene como objetivo administrar un servicio de paqueteria... ya que requiere de usuarios y estos usuarios pueden tener un
carro el cual en la bd se representa como un truk, ademas de esto el usuario puede tener una order que podria ser un paquete a entregar
ademas de esto en la misma bd tenemos una collection que hace referencia a un lugar (location) ya que hace eso de la api de google para
obtener la direccion de la ubicacion, asi como sus cooredenadas(lat,lng),
Su funcion principal es poder asociar una entrega a un usuario con un determinado vehiculo, ademas de indicarle donde recoger un paquete o de donde partir y hacia donde debe de llegar

## Funcionalidad de la api

## **Usuarios**
Permite gestionar los usuarios dentro del sistema.

### metodo POST /api/usuario/registrar  
  Registra un nuevo usuario en el sistema, pidiendo datos como el email y su respectiva contraseña
  estos datos son enviados desde el body

  **Body (JSON):**
``` json
  {
      "email": "test4@gmail.com",
      "password": "qwerty123"
  }
```

### metodo GET /api/usuario?limite=5&desde=0  

    Muestra todos los usuarios que existen y se el pueden agregar 2 query.params
    que sirven para indicarle al ep cuantos usuarios queremos mostrar y desde que usuario

    Nos regresa algo como lo siguiente

```json
{
    "total": 6,
    "usuarios": [
        {
            "_id": "676f0f07556c0b217c9f397a",
            "email": "juan-vizz@hotmail.com",
            "password": "$2a$10$apg0m6gPp3J8bDyb2QmM/.KNOcPuOz8YqAvw3bQ7NZ5O0DaW3c/vi",
            "estado": true,
            "__v": 0
        },
        {
            "_id": "676f19ed3202d0619c3c8929",
            "email": "test1@gmail.com",
            "password": "$2a$10$OBVgB/s5qQ6agHxPM3TZHumdTFDapscvTC9bCZFLYY.kXi3M/RDQ2",
            "estado": true,
            "__v": 0
        }
    ]
}
```

### metodo PUT /api/usuario
    Este ep sirve par modificar la contraseña del usuario, pero para poder acceder a este ep se debe estar loggeado ya que al loggearse el jwt se crea en las cookies y asi sabe quien es la persona que esta en linea, asi no se tiene que mandar ningun id del usuario ya que se sube automaticamente cuando se genera y valida el jwt, en este ep solo se espera un campo desde el body y modifica la contraseña a la nueva que se le manda, cabe aclarar que siempre encryptamos la contraseña

``` json
{
    "password": "123456789"
}
```

### metodo DELETE /api/usuario

    En este metodo se puede eliminar el usuario si asi se desea, pero para una mayor integridad de los datos se agrego un campo en la bd de la collection Usuario para conservar la integridad de los datos ya que si se eliminara difinitivamente de la bd podria causar problemas ya que esta relacionado con otras collections, de igual manera lo unico que necesita este ep es esta loggeado para poder validar el jwt de las cookies y un parametro en el body para estar seguro de eliminarlo(desactivar el usuario para mantener la integridad)

```json
{
    "confirmacion": "autorizado"
}
```
## **LOGIN**
 Permite inciar sesion y obtener un jwt
### metodo POST /api/auth/login
Permite al usuario iniciar sesion para poder interctuar con los ed del proyecto, ya que en su mayoria se necesita el jwt que se genera en las cookies automaticamente cuando se inicia sesion, aqui deben de mandarse 2 parametros por medio del body
```json
{
    "email": "testFinal@gmail.com",
    "password": "123456789"
}
```
y si estos campos coinciden con los parametros que se tiene en la bd se inicia sesion y en la response obtenemos esto
```json
{
    "msg": "Login exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NzcwZDRjOWI5OTIyMTdiYzdkYTZjZDUiLCJpYXQiOjE3MzU0NDgwMzksImV4cCI6MTczNTQ2OTYzOX0.zDqNmQ1Vn9ZcXYClkKHLEBqR9aJ9gOONDcG4ZvR-igs"
}
```

### Apatir de aqui todos los ed tiene la validacion del jwt, por ello el usuario debe de loggearse en la ruta de login

## **Trucks**
Se crea una nueva collection donde se van a guardar los documentos trucks asociados a un usuario
### Metodo POST /api/truck
Permite crear un nuevo truk, recibe los sigueintes parametros desde el body
```json
{
    "year":"2024",
    "color":"violeta",
    "plate":"777-zZZz"
}
```
Donde estos datos se verifican para validarlos, en el caso mas importante con la placa, ya que se valida con respecto a una expresion regular donde debe de contener un cierto formato
```
/^[A-Za-z0-9]{3}-[A-Za-z0-9]{2,5}$/
```
como se ve en la expresion debe de contener 3 digitos o letras MAYUSCULAS/minusculas seguido de un guion y despues de este mas de 1 pero menos de 6 caracteres incluyendo numeros y letras MAYUSCULAS/minusculas
si se cumplen estas validaciones se nos creara un truck asociado al usuario que lo crea

### Metodo GET /api/truck?limite=7&desde=0
Este ep nos regresa una lista de todos los trucks de todos los usuarios que igual podemos elegir la cantidad de trucks que nos muestra por medio de los query.params, que por defecto muestra 10 usuarios desde el primero y se ve algo como lo siguiente
```json
{
    "total": 8,
    "usuarios": [
        {
            "user": {
                "email": "test1@gmail.com"
            },
            "year": "2000",
            "color": "rojito",
            "plate": "115-abba",
            "estado": true,
            "uid": "676fced4eb12ebbad4940a50"
        },
        {
            "user": {
                "email": "test2@gmail.com"
            },
            "year": "2000",
            "color": "cambioColor",
            "plate": "400-abce",
            "estado": true,
            "uid": "676fcf29eb12ebbad4940a64"
        },
        {
            "user": {
                "email": "test4@gmail.com"
            },
            "year": "2000",
            "color": "azulPrueba3",
            "plate": "444-as8w",
            "estado": true,
            "uid": "676fdbd8aaa86b3824c88322"
        }
    ]
}
```

### Metodo GET /api/truck/user?limite=7&desde=0
De igual manera como el metodo anterior pero este solo muestra los trucks creados por el usuario loggeado, tambien se pueden configurar los query.params
y la respuesta seria algo asi
```json
{
    "total": 3,
    "usuarios": [
        {
            "user": {
                "email": "testFinal@gmail.com"
            },
            "year": "2024",
            "color": "violeta",
            "plate": "999-zZZz",
            "estado": true,
            "uid": "6770d75ab992217bc7da6d1c"
        },
        {
            "user": {
                "email": "testFinal@gmail.com"
            },
            "year": "2024",
            "color": "violeta",
            "plate": "888-zZZz",
            "estado": true,
            "uid": "6770d765b992217bc7da6d21"
        },
        {
            "user": {
                "email": "testFinal@gmail.com"
            },
            "year": "2024",
            "color": "modificaionAzul marino",
            "plate": "777-zZZz",
            "estado": false,
            "uid": "6770d76bb992217bc7da6d26"
        }
    ]
}
```


### Metodo PUT /api/truck/:id
Este ep sirve para modificar campos de un truck es especifico,para ello se manda el id en los params y las modificacioens en el body, es opcional mandar solo un campo o ambos ejemplo
```json
{
            "color": "azul marino"
}
```
Si el id de los params es valido y tambien el campo de color se mofica esta campo y se sube a la bd y la respuesta se muestra asi
```json
{
    "msg": "Truck modificado exitosamente",
    "dataMod": {
        "color": "azul marino"
    }
}
```
Ademas para ver los cambios podriamos regresa a el ep de GET /api/truck/user

### Metodo DELETE /api/truck/:id
En este ep se elimina(desactiva un truck) pasandole el id por los params y una atorizacion por el body que debe de llevar esta estructura
```json
{
    "confirmacion":"autorizado"
}
```
ya que si no cumple con esta no sera eliminado(estado:false) el truck, ademas de validar el id y si se eliminaria nos daria una respueat como la siguiente
```json
{
    "msg": "Truck desactivado",
    "truck": {
        "user": {
            "email": "testFinal@gmail.com"
        },
        "year": "2024",
        "color": "violeta",
        "plate": "888-zZZz",
        "estado": false,
        "uid": "6770d765b992217bc7da6d21"
    }
}
```
* Si volvieramos a presionar el boton nuevamente nos daria un error
```json
{
    "errors": [
        {
            "type": "field",
            "value": "6770d765b992217bc7da6d21",
            "msg": "No existe truck con id 6770d765b992217bc7da6d21 - estado:false",
            "path": "id",
            "location": "params"
        }
    ]
}
```

## **Locations**
Se crea una nueva collection donde se van a guardar los documentos locations
* Como dato curioso comence primero a realizar este dominio debido a que no tenia relacion con ninguna otro collection y a que este era el que mas tiempo me requeriria para investigar sobre la implementacion de la api ya que si me costo un poco encontrar la pagina donde me daba como hacer la peticion
```
https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=ChIJsUDXn2od0oURpAnsjV2k44A&key={apikey}
```
y leyendo la codumentacion la deje solo con lo necesario
```
https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.API_KEY}`
```
ademas que con ele ejemplo me mostro todo el objeto que regresaba la peticion para poder desestructurar losa datos que necesitaba

### Metodo POST /api/location
Con este ep podia crear una location(lugar por medio de enviarle un place_id) en el body como se muestra
```json
{
    "place_id":"ChIJZ1reBYltGkcRtKUADrW08hQ"
}
```
los place_id los generaba de una pagina de google que me los daba al buscar un lugar
```
https://developers.google.com/maps/documentation/places/web-service/place-id?hl=es-419
```
asi estos los probaba y me regresaba la siguiente respuesta
usando un place_id que venia en el repop donde venian las instrucciones
```json
{
    "address": "San Isidro 44, Reforma Soc, Miguel Hidalgo, 11650 Ciudad de México, CDMX, Mexico",
    "place_id": "ChIJiRp93iEC0oURvJVqErpVVHw",
    "latitude": 19.433681,
    "longitude": -99.2121884,
    "uid": "6770ea9d8221d3c10dd2cede"
}
```
### Metodo GET /api/location?desde=0&limite=1
En este ep no teniamos que mandarle algun parametro unicamnete se necesita estar loggeado y nos muestra todos los locations creados, igual podemos manipular los datos que nso muestra con los query.params limite|desde
```json
{
    "total": 12,
    "locations": [
        {
            "address": "Unidad Profesional Adolfo López Mateos, ESCOM IPN, Av. Juan de Dios Bátiz, Nueva Industrial Vallejo, Gustavo A. Madero, 07320 Ciudad de México, CDMX, Mexico",
            "place_id": "ChIJ11_XBkz50YURyQoZon1W4T8",
            "latitude": 19.5046493,
            "longitude": -99.146323,
            "uid": "67705b542798c1bccbdec290"
        },
    ]
}
```

### Metodo PUT /api/location/:id
Nos permite modicar el place_id de un locations ya existente
para ello necesitamos el id en los params y el nuevo place_id en el body
```json
{
    "place_id":"ChIJwULG5WSOUDERbzafNHyqHZU"
}   
```
con esto enviado nos daria una respuesta como a continuacion
```json
{
    "msg": "Location modificado",
    "location": {
        "address": "Singapore",
        "place_id": "ChIJdZOLiiMR2jERxPWrUs9peIg",
        "latitude": 1.352083,
        "longitude": 103.819836,
        "uid": "6770552bd8e5ce113d212ede"
    }
}
```


### Metodo delete /api/location/:id
Aqui podemos eliminar un location mandando un id a los params y un parametro desde el body como a continuacion
```json
{
    "confirmacion": "autorizado"
}
```
ya que sin eso no se eliminaria, si todo esta correcto veriamos un mensaje como el siguiente
```json
{
    "msg": "Location elimidao de la bd",
    "locationDelete": {
        "address": "Singapore",
        "place_id": "ChIJdZOLiiMR2jERxPWrUs9peIg",
        "latitude": 1.352083,
        "longitude": 103.819836,
        "uid": "6770552bd8e5ce113d212ede"
    }
}
```


## **Orders**
Esta parte iba a estar asociada a un truck,a un usuario y dos campos diferentes pero de la misma collection, y un campo independiente que era el status de order

* La realice al ultimo justamente por su relacion con todas las otras collections para que no me fuera a dar un error

### Metodo POST /api/order
Aqui se crean las orders, lo que se necesita para crearlas son lso siguientes campos en el body
```json
{
    "truck": "6770d76bb992217bc7da6d26",
    "pickup": "677053a5163c6ba3579657b6",
    "dropoff": "6770561ba7fefce096aec27e"
}
```
donde hay que estar seguros que todos esos ids existen en la bd en truck y en locations ya registrados de otra forma nos marcara el siguiente error
```json
{
    "errors": [
        {
            "type": "field",
            "value": "677053a5163c6ba3579657b5",
            "msg": "El idLocation: 677053a5163c6ba3579657b5 no existe en la bd",
            "path": "pickup",
            "location": "body"
        }
    ]
}
```
ademas de no mandar el mismo location a ambos campos de pickup y dropoff o nos dara un error
```json
{
    "errors": [
        {
            "type": "field",
            "value": "6770561ba7fefce096aec27e",
            "msg": "La ubicación de pickup y dropoff no pueden ser iguales",
            "path": "pickup",
            "location": "body"
        }
    ]
}
```
pero si todos los ids en los campos de truck,pickup,dropoff existen se creara y nso regresara lo siguiente
```json
{
    "msg": "Order creada existosamente",
    "orderdb": {
        "user": {
            "_id": "6770d4c9b992217bc7da6cd5",
            "email": "testFinal@gmail.com"
        },
        "truck": {
            "_id": "6770d76bb992217bc7da6d26",
            "year": "2024",
            "color": "azul marino",
            "plate": "777-zZZz"
        },
        "status": "created",
        "pickup": {
            "_id": "6770d67db992217bc7da6d04",
            "address": "97-438 Rusiec, Poland"
        },
        "dropoff": {
            "_id": "6770561ba7fefce096aec27e",
            "address": "China"
        },
        "uid": "6770f0c18221d3c10dd2cf11"
    }
}
```

### Metodo GET /api/order?limite=3&desde=0
de igual manera funciona con query.params donde las podemos modificar pero solo nos regresara los orders que el usuario loggeado creo
```json
{
    "total": 3,
    "orders": [
        {
            "user": {
                "_id": "676fdba1aaa86b3824c8831b",
                "email": "test4@gmail.com"
            },
            "truck": {
                "_id": "67704f05d6e94b55f098cf45",
                "year": "2000",
                "color": "azul cian",
                "plate": "499-zxcv"
            },
            "status": "completed",
            "pickup": {
                "_id": "67706c85832d51ed346f3f8b",
                "address": "Laguna de Zumpango, Estado de México, Mexico"
            },
            "dropoff": {
                "_id": "6770c5589115576c1dce67e4",
                "address": "Nayarit, Mexico"
            },
            "uid": "67708fccf23d08aa0176db58"
        },
        {
            "user": {
                "_id": "6770d4c9b992217bc7da6cd5",
                "email": "testFinal@gmail.com"
            },
            "truck": {
                "_id": "6770d76bb992217bc7da6d26",
                "year": "2024",
                "color": "azul marino",
                "plate": "777-zZZz"
            },
            "status": "created",
            "pickup": {
                "_id": "677053a5163c6ba3579657b6",
                "address": "Ignacio Zaragoza, San Sebastian, 55600 San Sebastián, Méx., Mexico"
            },
            "dropoff": {
                "_id": "6770561ba7fefce096aec27e",
                "address": "China"
            },
            "uid": "6770d867b992217bc7da6d65"
        },
        {
            "user": {
                "_id": "6770d4c9b992217bc7da6cd5",
                "email": "testFinal@gmail.com"
            },
            "truck": {
                "_id": "6770d76bb992217bc7da6d26",
                "year": "2024",
                "color": "azul marino",
                "plate": "777-zZZz"
            },
            "status": "created",
            "pickup": {
                "_id": "6770d67db992217bc7da6d04",
                "address": "97-438 Rusiec, Poland"
            },
            "dropoff": {
                "_id": "6770561ba7fefce096aec27e",
                "address": "China"
            },
            "uid": "6770f0c18221d3c10dd2cf11"
        }
    ]
}
```


### Metodo PUT /api/order/:id
aqui podremos modificar los locations de  una order,siempre recordando que debemos de mandarle ids validos de locations en la bd y si fueron iguales a otro order nos da un error, los datos los enviamos a traves del body y el id en los params 
```json
{
    "pickup": "67706c85832d51ed346f3f8b",
    "dropoff": "6770c5589115576c1dce67e4"
}
```
si existiera otro order con los mismos locations nos regresaria un error como el siguiente
```json
{
    "msg": "Existe una order con las mismas locations verifique su order"
}
```
pero si no lo modificaria y nos daria el sig mensaje
```json
{
    "msg": "Order modificado exitosamente",
    "updatedOrder": {
        "user": {
            "_id": "6770d4c9b992217bc7da6cd5",
            "email": "testFinal@gmail.com"
        },
        "truck": {
            "_id": "6770d76bb992217bc7da6d26",
            "year": "2024",
            "color": "azul marino",
            "plate": "777-zZZz"
        },
        "status": "created",
        "pickup": {
            "_id": "67706b49832d51ed346f3f73",
            "address": "Perif. Blvd. Manuel Ávila Camacho 3130, Valle Dorado, 54020 Tlalnepantla, Méx., Mexico"
        },
        "dropoff": {
            "_id": "6770c52d9115576c1dce67dc",
            "address": "Merida, Yucatan, Mexico"
        },
        "uid": "6770d867b992217bc7da6d65"
    }
}
```

### Metodo DELETE /api/order/:id
aqui podemos borrar un order mandando el id el los params y lo siguiente en el bosy par que se ejecuta la eliminacion
```json
{
    "confirmacion": "autorizado"
}
```
con esto podriamos eliminar una order y obtendriamos una respuesta como
```json
    {
    "msg": "Order eliminado de la bd",
    "orderDelete": {
        "user": {
            "_id": "676fdba1aaa86b3824c8831b",
            "email": "test4@gmail.com"
        },
        "truck": {
            "_id": "67704f05d6e94b55f098cf45",
            "year": "2000",
            "color": "azul cian",
            "plate": "499-zxcv"
        },
        "status": "completed",
        "pickup": {
            "_id": "67706c85832d51ed346f3f8b",
            "address": "Laguna de Zumpango, Estado de México, Mexico"
        },
        "dropoff": {
            "_id": "6770c5589115576c1dce67e4",
            "address": "Nayarit, Mexico"
        },
        "uid": "67708fccf23d08aa0176db58"
    }
}
``` 
en dado caso que ya la hayamos borrado o no exista nos regrearia algo como lo siguiente
```json
{
    "errors": [
        {
            "type": "field",
            "value": "67708fccf23d08aa0176db58",
            "msg": "No existe un order con id 67708fccf23d08aa0176db58 en la bd",
            "path": "id",
            "location": "params"
        }
    ]
}
```



### Metodo PATCH /api/order/status/:id
por ultimo tenemos un ep especial para modificar el status de una order en un ed diferente al de la ruta de orders, donde debemos mandar el id del order a modificar su status y en el body el nuevo valor del status
```json
{
    "status": "completed"
}
```
si el status no fuera el correcto no arroja un error con los posibles valores
```json
{
    "errors": [
        {
            "type": "field",
            "value": "as",
            "msg": "Estatus no válido, verifique que es estatus cumpla con \"created, in transit, completed\"",
            "path": "status",
            "location": "body"
        }
    ]
}
```
si se modificara correctamente el status nos regresaria todo el order y podemos ver que el status cambio
```json
{
    "msg": "Estatus de la orden actualizado correctamente",
    "orderStatus": {
        "user": {
            "_id": "6770d4c9b992217bc7da6cd5",
            "email": "testFinal@gmail.com"
        },
        "truck": {
            "_id": "6770d76bb992217bc7da6d26",
            "year": "2024",
            "color": "azul marino",
            "plate": "777-zZZz"
        },
        "status": "completed",<----------------
        "pickup": {
            "_id": "67706b49832d51ed346f3f73",
            "address": "Perif. Blvd. Manuel Ávila Camacho 3130, Valle Dorado, 54020 Tlalnepantla, Méx., Mexico"
        },
        "dropoff": {
            "_id": "6770c52d9115576c1dce67dc",
            "address": "Merida, Yucatan, Mexico"
        },
        "uid": "6770d867b992217bc7da6d65"
    }
}
```
y en caso de que queramos modificarlo pero le pasaramos el mismo parametro que ya tiene nos regresa lo siguiente
```json
{
    "msg": "El status del order es igual al que se quiere modificar "
}
```
### Con esto termino la explicacion de la funcionalidad de la api


--- 


# manera en la cual abordaste el desarrollo del mismo.

- Primeramente comence a analizar lo que venia en las instrucciones y comenzar a pensar como funcionaba todo el sistema en cojunto
- ya que tuve concretamente la idea de como debia de funcionar comence a investigar sobre typeScript ya que si bien habia eschuchado de el nunca lo habia usado para un proyecto, normalmente habia usado node.js solo 
- comence a investigar sobre typeScript en videos e internet y lo que entendi fue que lo que hace typeSript es basicamente hacer que js no sea ambiguo en el aspecto de que podemos cambiar el tipo de dato para una variable y si bien puede ser flexible para ciertas cosas puede tener sus desventajas, por ello debe de llevar una normativa que seria el tipado donde cada variable tendria que ser desde un principio declarada de cierto tipo
- personalmente lo asocie a como se maneja java o c declaras siempre tus tipo de variables antes de comenazar a usarlas para que no tengas problemas
- y si bien typeScript no es el que se ejecuta por que es como un tipo compilador que genera codigo js pero mas completo y sin posibles vulnerabilidades a errores
- comence primeramente a investigar como inicializar el proyecto con typeScript y despues a como se compilaba y ejecutar ese mismo codigo de js con node
- al incio fue muy complicado ya que todo me daba error xd
- pero fui corrijiendo la mayoria a como podia ya que ciertamente no me volvi un experto en typeScript en 2 dias pero trataba de seguir al logica de declarar cualquier tipo de valor tanto de variables como de lo que regresaban las funciones o promesas ....
- una vez que tuve completo un dominio (usuarios) me fue un poco mas facil poder completar lo demas ya que almenos tenia ya una base fucnional sobre ts
- despues realice el sigiente dominio siguiendo los requerimientos de trucks y a medida que seguia analizando como abordar el proyecto me parecio una mejor idea comenzar despues de truck por los locatiosn ya que igual sabia que buscando e intentando consumir la api de google me iba a llevar un buen tiempo pero era pieza fundamental tener primero locations ya que orders dependia de este
- fue un poco dificil para mi encotrar la documentacion de la api ya que se me hacia muy enredado los vinculos que venian en la doumentacion pero que no me redireccionaban a donde estaba el ejemplo de como consumir la api
- Despues de mucho tiempo pude encotrar el ejemplo y ya tenia algo de experiencia para consumir apis asi que no se me hizo tan complicado ya en ese punto ademas de que el ajecutar la url que me daban me mandaba a una pagina en donde se me msotarba todo el objeto de la respuesta de la api y asi pude encotrar de manera mas rapida la forma de desestructurar ra data que recibia del api
creo que en si era la parte que mas complicada veia pero se logro
y terminar al parte de orders fue mas facil cuando ya tenia todos los campos que ocupaba el modelo

### Para terminar debo decir que personalemente fue un gran reto, donde de verdad se pusieron aprueba mis habilidades y conocimientos sobre la programacion relacionada con la parte del backend usando herramientos como lo son node.js, postman, mongodb, los paquetes de node como express, express-validator, mongoose, axios, cors, cookie-parser, jwt, dotenv... fue un gran reto que de verdad me hizo crecer un poco mas a la hora de desarrollar proyectos en tiempos determinados y me llevo un gran aprendizaje del msimo







# ¿Como ejecutar el proyecto?
una vez descargado el codigo de github de menera manual o abriendo una consola en la direccion donde se quiere descargar podemos ejecutar un
```
git clone https://github.com/VicenteRv/BeGo.git
```
y esto nos descargaria el proyecto dento de la carpete llamada BeGo
Abrimos esta carpeta en visual y

vamos a ejecutar en consola el comando
```
npm i 
```

para que se descarguen todas las dependencias para node
Para instalar typeScript de manera global

```
npm install -g typescript
```
una vez instalado esto
para ejecuta el codigo primero compilamos el codigo de ts, ejecutando lo siguiente en la consola
```
tsc
```
Une vez compilado, se nos creara la carpeta dist
y ahi se encontrara el archivo app.js para ejecutar con node 
# IMPORTANTE
hayq ue crear el archivo .env en la raiz del proyecto con sus respectivos calores
```.env
PORT=
MONGODB=
SECRETORPRIVATEKEY=
API_KEY=
```
Despues de asignarle el valor a nuestras variables de entorno podemos
ejecutar el siguiente comando para correr el proyecto compilado
```
node .\dist\app.js
```