require('dotenv').config()
const chai = require('chai')
const expect = chai.expect()
const chaiHTTP = require('chai-http')
const request = require('request')
const app = require('../server.js')

chai.use(chaiHTTP)
chai.should()

describe('GET /api/contacts', () =>{
    it('return all contacts', (done) =>{
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) =>{
                // console.table(res)
                res.should.have.status(200)
                done()
            })
    })
    it('return all products', (done) =>{
        chai.request(app)
            .get('/api/products')
            .end((err, res) =>{
                // console.table(res)
                res.should.have.status(200)
                done()
            })
    })
    it('return product by id', (done) =>{
        chai.request(app)
            .get('/api/product/4')
            .end((err, res) =>{
                // console.table(res)
                res.should.have.status(200)
                done()
            })
    })
    it('create new contact', (done) =>{
        chai.request(app)
            .post('/api/newContact/')
            .end((err, res) =>{
                // console.table(res)
                res.should.have.status(200)
                done()
            })
    })
})