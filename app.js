const express = require('express')
let app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Hola")
})

app.get('/libros', (req, res) => {
  //Regresar todos los libros de la BD
  console.log("Estamos en el GET de libros");
  res.send(200)
})

app.get('/libros/:id', (req, res) => {
  //Regresar SOLO el libro con el ID recibido
  console.log("Estamos en el GET especifico");
  res.send(200)
})

app.post('/libros', (req, res) => {
  //Parsear informacion recibida
  //Guardarla en la BD
  //responder con un mensaje de error o de success
  console.log("Estamos en el POST de libros");
  res.send(200)
})

app.put('libros/:idlibro', (req, res) => {
  console.log("Estoy en el PUT libros");
  res.send(200)
})

app.delete('libros/:idlibro', (req, res) => {
  console.log("Estoy en el DELETE de libros");
  res.send(200)
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