const app = require('./app')

//const port = process.env.PORT_APP;
const port = 3333

app.listen(port, () => {
    console.log("Servidor Rodando na Portas: ", port)
})
