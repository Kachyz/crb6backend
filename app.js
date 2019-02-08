const express = require('express')
let app = express()
const bodyParser = require('body-parser')
const rutaLibros = require('./routes/libros')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/libreria')

app.use(bodyParser.json())
app.use('/libros', rutaLibros)

mongoose.connection.once('open', () => {
  console.log("SI me pude conectar a la BD");
}).on('error', () => {
  console.log("NO me pude conectar :(");
})

app.get('/', (req, res) => {
  res.send("Hola")
})


//process.env contiene las variables de ambiente del proceso
app.listen(process.env.PORT || 5000, () => {
  if(process.env.PORT)
    console.log(`Estoy corriendo en el puerto ${process.env.PORT}`);
  else
    console.log(`Estoy corriendo en el puerto 5000`);
})

// API DE LIBROS
/*
  - Crear endpoints para tener un CRUD completo
    * Archivo por separado
  - Hacer una conexion a la BD
  - Crear una coleccion en nuestra BD para almacenar toda la informacion
    * Schema
  - Regresar un codigo de respuesta ademas de la informacion
*/