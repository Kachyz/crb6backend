const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LibroSchema = new Schema({
  titulo: {type: String, required: true}, //CAMPO OBLIGATORIO
  autor: String,
  anio: Number
})

// module.exports = mongoose.model(collection, Schema)
module.exports = mongoose.model('libro', LibroSchema)