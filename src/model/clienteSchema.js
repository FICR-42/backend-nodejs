const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({

  name: { type: String, require: true, },
  cpf: { type: String, require: true, unique: true },
  telefone: { type: String, required: true },
  /*denuncia: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Denuncia'
  }]*/
  

})

const Cliente = mongoose.model('cliente', ClienteSchema)

module.exports = Cliente;