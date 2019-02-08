const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const LibroModel = require('../models/LibroModel')

router.use(bodyParser.json())

let libros = [
    {titulo: 'la tregua'}, 
    {titulo: 'el principito'}
  ]

router.get('/', (req, res) => {
  //Regresar todos los libros de la BD
  console.log("Estamos en el GET de libros");

  LibroModel.find((err, libros) => {
    if (err){
      console.log(`Hubo un error con el GET a la raiz ${err}`)
      res.send(400)
    } 
    res.send(libros)
  })
})

router.get('/:id', (req, res) => {
  //Regresar SOLO el libro con el ID recibido
  let id = req.params.id
  console.log("Estamos en el GET especifico");
  res.send(libros[id])
})

router.post('/', (req, res) => {
  console.log("Estamos en el POST de libros");
  //Parsear informacion recibida
  // let nuevoLibro = req.body
  //Guardarla en la BD
  // libros.push(nuevoLibro)

  let nuevoLibro = new LibroModel(req.body)
  nuevoLibro.save()
    .then(() => { console.log('Libro guardado') })
    .catch(() => { console.log("No se puede guardar :(") })

  //responder con un mensaje de error o de success
  res.send(nuevoLibro)
})

router.put('/:idlibro', (req, res) => {
  console.log("Estoy en el PUT libros");
  // let id = req.params.idlibro
  // let miLibro = libros[id]

  // for(let key in req.body){
  //   miLibro[key] = req.body[key]
  // }
  // libros[id] = miLibro
  // res.send(libros)

  let idRecibido = req.params.idlibro
  LibroModel.findOneAndUpdate(
    {_id: idRecibido},          // QUERY, las condiciones a revisar para saber que elemento se modificara
    req.body,                   // Nuevo valor de ese documento (registro)
    {new: true},                // Opciones
    (err, doc, raw) => {        // CB, <opcional> en caso de querer realizar alguna accion adicional
      if (err)
        console.log('ERROR', err);
      else
       console.log("NO HAY ERROR")
    }
  )
  
  LibroModel.find((err, libros) => {
    if (err){
      console.log(`Hubo un error con el PUT a la raiz ${err}`)
      res.send(400)
    } 
    res.send(libros)
  })


})

router.delete('/:idlibro', (req, res) => {
  console.log("Estoy en el DELETE de libros");
  let id = req.params.idlibro
  libros.splice(id, 1) 
  res.send(200)
})

module.exports = router