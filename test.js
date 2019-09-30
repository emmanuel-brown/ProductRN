

describe('Tests for "/" api endpoint', () => {
    it("/ should send back 200 status code", (done) => {
        request.get('/', (error, response, body) => {
            expect(200)
            done()
        })
    })
    it("/ should not send back json in the body", (done) => {
        request.get("/", (error, response, body) => {
            expect(body).to.not.be.an('json')
            done()
        })
    })
    it('/ should return 200 status code'), (done) =>{
        request.get('/api/products/:orderBy/:isAscending/:catagory', (req, res) =>{
            expect(200)
            done()
        })
    })
    it('/ should return 200 status code'), (done) =>{
        request.get('/api/products/:orderBy/:isAscending/', (req, res) =>{
            expect(200)
            done()
        })
    })
    it('/ should return 200 status code'), (done) =>{
        request.get('/api/products/:orderBy/:isAscending/', (req, res) =>{
            expect(200)
            done()
        })
    })
}