const request = require('supertest')
const app = require('../app')

describe('GET /healthcheck', () => {
    it('Deve retornar JSON com mensagem "API online..."', (result) => {
        const expected = {
            message: 'API online...'
        }

        request(app).get('/healthcheck').expect(expected, result)
    })
})