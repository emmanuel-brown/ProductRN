const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/hello', (req, res) => {
    res.json({"hello": "You already know what's up"})
})

let thing

app.post('/api/name/', (req, res) =>{
    if(req.params.firstName !== ""){
        res.json({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName
        })
        thing = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    }
    console.table(thing)
    res.send(JSON.stringify(thing))
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`)})