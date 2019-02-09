const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const LibroModel = require('../models/LibroModel')

router.use(bodyParser.json())

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

  LibroModel.findById(id, (err, libro) => {
    if (err)
      res.send(404)
    else
      res.status(200).send(libro)
  })
})

router.post('/', (req, res) => {
  console.log("Estamos en el POST de libros");

  let nuevoLibro = new LibroModel(req.body)
  nuevoLibro.save()
    .then(() => { console.log('Libro guardado') })
    .catch(() => { console.log("No se puede guardar :(") })

  res.send(nuevoLibro)
})

router.put('/:idlibro', (req, res) => {
  console.log("Estoy en el PUT libros");

  let idRecibido = req.params.idlibro
  LibroModel.findOneAndUpdate(
    {_id: idRecibido},          // QUERY, las condiciones a revisar para saber que elemento se modificara
    req.body,                   // Nuevo valor de ese documento (registro)
    (err, libro) => {           // CB, <opcional> en caso de querer realizar alguna accion adicional
      if (err)
        res.send(`Error de actualizacion, ${err}`)
      else
        res.status(200).send(`Libro actualizado, ${libro}`)
    }
  )
})

router.delete('/:idlibro', (req, res) => {
  console.log("Estoy en el DELETE de libros");
  let id = req.params.idlibro
 
  LibroModel.findOneAndRemove(id, (error, data) => {
    if(error)
      res.send(error);
    else
      res.status(200).send('Elemento eliminado');
  })
})

module.exports = router