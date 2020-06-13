const { Router } = require('express')
const ClienteController = require('../controller/ClienteController')
const DenunciaController = require('../controller/DenunciaController')
//const UserController = require('../controller/UserController')
//const authMiddleware = require('../middleware/auth')

const app = Router()

// Rotas Denunciasto
app.post('/denuncia', DenunciaController.post)
app.get('/denuncia/:protocolo', DenunciaController.listDenunciaProtocolo)

// Validation User
//app.post('/register', UserController.post);

//app.use(authMiddleware)

// Rota de autenticação
//app.post('/Authenticate', UserController.Authenticate)

/*app.get('/register', UserController.list)
app.get('/register/:id', UserController.listOne)
app.put('/register/:id', UserController.edit)
app.delete('/register/:id', UserController.delete)*/


// Rota Cliente And Denuncia.
app.post('/cliente', ClienteController.postCliente)
app.get('/clienteAll', ClienteController.listClient)
app.get('/cliente/:id', ClienteController.listClientOne)
app.put('/cliente/:id', ClienteController.updateCliente)
app.delete('/cliente/:id', ClienteController.deleteCliente)

app.get('/cli/denuncia', ClienteController.listDenuncia)
app.get('/cli/denuncia/:protocolo', DenunciaController.listDenunciaProtocolo)
app.get('/cli/denuncia/:id', ClienteController.listOneDenuncia)
app.put('/cli/denuncia/:id', ClienteController.alterarDenuncia)
app.delete('/cli/denuncia/:id', ClienteController.deleteDenuncia)

module.exports = app;
