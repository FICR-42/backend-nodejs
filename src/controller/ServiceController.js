const Service = require('../model/serviceSchema')

class ServiceController {

  async create(req, res) {
    try {
      const data = await Service.create(req.body)
      console.log(data)
      return res.status(200).send({ data })

    }
    catch (error) {
      return res.status(400).send({
        message: 'Algo deu errado ao cadastrar Serviço!'
      })
    }
  }


}

module.exports = new ServiceController()