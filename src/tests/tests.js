const request = require('supertest')
const app = require('../app')

describe('GET /', () => {
    it('Deve retornar JSON com mensagem "API online..."', (result) => {
        const expected = {
            message: 'API online...'
        }

        request(app).get('/').expect(expected, result)
    })
})