// traemos a express
const express = require("express");
const routerApi = require("./routes");
// exportamos el middleware
const { logErrors, errorHandler, boomErrorHandler } = require("./Middlewares/error.handler");
const cors = require("cors");
// creamos una aplicación
const app = express();
//le decimos el puerto en que queremos que corra la aplicación
const port = 3000;
// Middleware que tiene que ir para recibir data del body
app.use(express.json());

//const whiteList = ["localhost:3000/api/v1/products"];
const whiteList = ['http://127.0.0.1', 'http://localhost', 'http://localhost:8080'];
const option = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Sin permiso"));
    }
  }
}
// Se puede usar cors o la segunda opcion
app.use(cors(option));
// Segunda opción
// app.use( function(req, res ,next){
//   res.header( 'Access-Control-Allow-Origin', "*" )
//   res.header( 'Access-Control-Allow-Methods', " GET, POST, PUT, PATCH, DELETE" )
//   res.header( "Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accep")
//   next()
// })

// Definimos la ruta
// Tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
//el callback siempre tiene dos parámetros "req" y "res".
app.get("/", (req, res) => {
  res.send("Hola mi server gmanan en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola soy un nuevo endpoint");
});



routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


// app.get("/users", (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     })
//   } else {
//     res.send("no hay parametros")
//   }
// })

// Le decimos a la aplicación en que puesto escuchar
// Además creamos un callback que nos avisará cuando esté corriendo
app.listen(port, () => {
  console.info(`Aplicación de ejemplo escuchando en el puerto http://localhost:${port}/api/v1/`);
});


//categoria ordenes usuarios
