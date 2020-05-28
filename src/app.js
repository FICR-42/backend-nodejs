const express = require('express')
const router = require('./routes/AllRoutes')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')

require('dotenv').config()

class App {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  middlewares() {
    this.express.use(express.json())
    //this.express.use(bodyParser.json())
    //this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  routes() {
    this.express.use(router)
  }

  database() {
    mongoose.connect('mongodb://admin:mongoadmin123@ficr-mongo:27017/ProjetoFicr?authSource=admin', {
      keepAlive: 1, useUnifiedTopology: true, useNewUrlParser: true
    }, (err) => err ? console.log(err) : console.log('Conectado ao MongoDB...'));
    mongoose.set('useCreateIndex', true)
  }
}

module.exports = new App().express
