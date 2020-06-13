const express = require('express')
const router = require('./routes/AllRoutes')
const mongoose = require('mongoose')
require('dotenv').config()
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
    mongoose.connect('mongodb://localhost:27017/ProjetoFicr', {
      keepAlive: 1, useUnifiedTopology: true, useNewUrlParser: true
    }, (err) => err ? console.log(err) : console.log('Conectado ao MongoDB...'));
    mongoose.set('useCreateIndex', true)
  }

  /*database() {
    mongoose.connect('mongodb://ficr-mongo:27017/ProjetoFicr', {
      keepAlive: 1, useUnifiedTopology: true, useNewUrlParser: true
    }, (err) => err ? console.log(err) : console.log('Conectado ao MongoDB...'));
    mongoose.set('useCreateIndex', true)
  }*/
}

module.exports = new App().express
