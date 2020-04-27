const { Router } = require('express')
const UserController = require('../controller/UserController')
const ClienteController = require('../controller/ClienteController')
const VeiculoController = require('../controller/VeiculoController')
const ServiceController = require('../controller/ServiceController')
const authMiddleware = require('../middleware/auth')
const app = Router()

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API online...' })
})

// Validation User
app.post('/register', UserController.post);


// app.use(authMiddleware)
app.get('/register', UserController.list);
app.get('/register/:id', UserController.listOne);
app.put('/register/:id', UserController.edit);
// app.delete('/register', UserController.delete);
// app.create('/register', UserController.create);

// Rota de autenticação
app.post('/Authenticate', UserController.Authenticate)


// Rotas de Clintes.
app.post('/cliente', ClienteController.post);
app.get('/cliente', ClienteController.list);
app.delete('/cliente/delete/:id', ClienteController.delete);
app.get('/cliente/:id', ClienteController.listOne);
app.put('/cliente/edit/:id', ClienteController.update);


// Rotas Automoveis.
app.post('/car', VeiculoController.post)
app.get('/car', VeiculoController.list)
app.get('/car/:id', VeiculoController.listOne)
app.put('/car/:id', VeiculoController.update)
app.delete('/car/:id', VeiculoController.delete)
// app.get('/car/modelo', VeiculoController.listQuery)


// Rotas Serviços.
app.post('/service', ServiceController.create)




module.exports = app;