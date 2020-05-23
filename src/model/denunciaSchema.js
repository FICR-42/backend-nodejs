const mongoose = require('mongoose')

const DenunciaSchema = new mongoose.Schema({

  placa: { type: String },
  motor: { type: String },
  marca: { type: String },
  cep: { type: String, require: true },
  endereco: { type: String },
  rua: { type: String },
  numero: { type: String },
  complemento: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  uf: { type: String },
  referencia: { type: String },
  email: { type: String, required: true },
  descricao: { type: String },
  createAdd: { type: Date, default: Date.now, },
  /*clientezzz: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente'
  }]*/
  
  // servico: { type: String, required: true },
  // proprietario: { type: String, required: true },


})

const Denuncia = mongoose.model('Denuncia', DenunciaSchema)

module.exports = Denuncia;