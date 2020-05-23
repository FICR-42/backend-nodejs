const { Router } = require('express')
const UserController = require('../controller/UserController')
const ClienteController = require('..//controller/ClienteController')
const DenunciaController = require('../controller/DenunciaController')
const authMiddleware = require('../middleware/auth')

const app = Router()

// Validation User
app.post('/register', UserController.post);

// Rotas Denuncias.
app.post('/denuncia', DenunciaController.post)

app.use(authMiddleware)

app.get('/register', UserController.list);
app.get('/register/:id', UserController.listOne);
app.put('/register/:id', UserController.edit);
// app.delete('/register', UserController.delete);
// app.create('/register', UserController.create);

// Rota de autenticação
app.post('/Authenticate', UserController.Authenticate)

// Rota Cliente And Denuncia.
app.post('/cliente', ClienteController.post)
app.get('/clienteAll', ClienteController.listClient)
app.get('/cliente/:id', ClienteController.listClientOne)
app.put('/cliente/:id', ClienteController.updateCliente)
app.delete('/cliente/:id', ClienteController.deleteCliente)

app.get('/cli/denuncia', ClienteController.listDenuncia)
app.get('/cli/denuncia/:id', ClienteController.listOneDenuncia)
app.put('/cli/denuncia/:id', ClienteController.alterarDenuncia)
app.delete('/cli/denuncia/:id', ClienteController.deleteDenuncia)

module.exports = app;
