const Denuncia = require('../model/denunciaSchema')
const nodeMailer = require('nodemailer')


class DenunciaController {

  async post(req, res) {

    function getRandom() {
      return Math.floor(Math.random() * (999999 - 100000) + 100000);
    }

    const random = getRandom()
    
    try {
      const denuncia = await Denuncia.create({...req.body, protocolo: random, status:'Denuncia Enviada!' })
      
      res.status(200).send({ 
        denuncia,
      })
    }
    catch (error) {
      return res.status(400).send({ message: 'Por algum motivo, a denuncia não foi cadastrada!' })
    }
    
    const emailFinal = function () {
      const transporter = nodeMailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: "55b6c8fe53c653",
          pass: "49cfdb5b014d9f"
        }
      })

      transporter.sendMail({
        from: 'Carros Abandonados <brunovinicius@gmail.com>',
        to: "brunoviniciustica@gmail.com",
        subjet: "Projeto Faculdade",
        html: 
          `
          <h1 text-align="center"> StartUp Carros Abandonados </h1>
          <p> Olá, Pessoal! Sua denuncia foi enviada com sucesso! O status dela esta em avaliação.
          Para mais informações ligue: 0800.366.000. Agradecimento: Familia Carros Abandonados. 
          Retornaremos assim que tiver-mos uma resposta. Caso você deseje saber as 
          atualizações da sua denuncia, no proprio App você poderá digitar esse Nº Protocolo: ${random},
          e ter mais informações. </p> 
          `
      })
    }

    emailFinal()
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
}

module.exports = new DenunciaController()