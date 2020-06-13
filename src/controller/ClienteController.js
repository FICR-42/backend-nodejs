const Cliente = require('../model/clienteSchema')
const Denuncia = require('../model/denunciaSchema')
const DenunciaControlle = require('../controller/DenunciaController')

class ClienteController {

  // Inicio Relacinado ao Cliente.
  async postCliente(req, res) {

    const { cpf } = req.body;

    try {
      if (await Cliente.findOne({ cpf }))
        return res.status(400).send({ message: "Cliente já foi cadastrado!" })

      const client = await Cliente.create(req.body)

      return res.send({ client })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado a criar o Cliente!' })
    }
  }

  async listClient(req, res) {
    try {
      const data = await Cliente.find()
      return res.status(200).json({ data })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado para listar o Cliente!' })
    }
  }

  async listClientOne(req, res) {
    try {
      const data = await Cliente.findById(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          return res.status(200).json(doc)
        })
      return data

    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado ao listar o Cliente! Rola' })
    }
  }

  async updateCliente(req, res) {
    try {
      const client = await Cliente.findById(req.params.id)
      const model = client
      model.name = req.body.name,
      model.save()
      return res.status(200).send({ model, message: 'Editou Cliente!' })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo deu errado ao tentar alterar o Cliente' })
    }
  }


  async deleteCliente(req, res) {
    try {
      const client = await Cliente.findOneAndDelete(req.params.id)
      return res.status(200).send({ client })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo errado para deletar Cliente' })
    }
  }

  // Tudo relacionado a Denuncia!
  async listDenuncia(req, res) {
    try{
      const denuncia = await Denuncia.find()
      const denunciaControlle =  DenunciaControlle.Protocolo
      
      if(!denuncia.status === true){
        denuncia.status = undefined
        return res.status(200).send({ denuncia, protocolo: denunciaControlle })
      }
      else{
        return res.status(200).send({ denuncia, message: "Status da denuncia está concluido!"})
      }
      
    }
    catch(err){
      return res.status(400).send({error: 'Algo deu errado ao listar as denuncias!'})
    }
  }

  async listDenunciaProtocolo(req, res){
    try{
      const denuncia = await Denuncia.findOne({ protocolo: req.params.protocolo })
        .then(doc => {
          if (!doc) { 
            return res.status(400).end(); 
          }
          return res.status(200).json(doc)
        })
        return denuncia
    }
    catch(err){
      return res.status(400).send({ message: 'Algo de errado ao listar um Usuario!'})
    }
  }

  async listOneDenuncia(req, res){
    try{
      const denuncia = await Denuncia.findById(req.params.id)
        .then(doc => {
          if (!doc) { return res.status(400).end(); }
          return res.status(200).json(doc)
        })
        return denuncia
    }
    catch(err){
      return res.status(400).send({ message: 'Algo de errado ao listar um Usuario!'})
    }
  }

  async alterarDenuncia(req, res) {
    try{
      const denunciaClient = await Denuncia.findById(req.params.id)
      const model = denunciaClient
      model.placa = req.body.placa,
        model.motor = req.body.motor,
        model.marca = req.body.marca
        model.cep = req.body.cep
        model.endereco = req.body.endereco
        model.rua = req.body.rua
        model.numero = req.body.numero
        model.complemento = req.body.complemento
        model.bairro = req.body.bairro
        model.cidade = req.body.cidade
        model.uf = req.body.uf
        model.referencia = req.body.referencia
        model.email = req.body.email
        model.descricao = req.body.descricao
        model.status = req.body.status
      model.save()
      return res.status(200).send({ model, message: 'Editou Denuncia!' })
    }
    catch(err){
      return res.status(400).send({
        message: 'Algo deu errado ao tentar alterar sua denuncia!'
      })
    }
  }

  async deleteDenuncia(req, res) {
    try {
      const id = req.params.id
      const denunciaDelete = await Denuncia.findByIdAndRemove(id)
      return res.status(200).send({ denunciaDelete })
    }
    catch (error) {
      return res.status(400).send({ message: 'Algo errado para deletar Cliente' })
    }
  }

  // Final Relacionado a Denuncia.
}

module.exports = new ClienteController()