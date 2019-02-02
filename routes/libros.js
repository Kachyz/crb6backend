const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

let libros = ['la tregua', 'el principito']

router.get('/', (req, res) => {
  //Regresar todos los libros de la BD
  console.log("Estamos en el GET de libros");
  res.send(libros)
})

router.get('/:id', (req, res) => {
  //Regresar SOLO el libro con el ID recibido
  let id = req.params.id
  console.log("Estamos en el GET especifico");
  res.send(libros[id])
})

router.post('/', (req, res) => {
  //Parsear informacion recibida
  let nuevoLibro = req.body
  //Guardarla en la BD
  libros.push(nuevoLibro)
  //responder con un mensaje de error o de success
  console.log("Estamos en el POST de libros");
  res.send(`Libro ${nuevoLibro.titulo} agregado`)
})

router.put('/:idlibro', (req, res) => {
  console.log("Estoy en el PUT libros");
  res.send(200)
})

router.delete('/:idlibro', (req, res) => {
  console.log("Estoy en el DELETE de libros");
  res.send(200)
})

module.exports = router