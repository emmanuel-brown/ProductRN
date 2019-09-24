const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lilman10',
    database: 'demo'
})

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

const values = (objects) =>{
    const value = []
    objects.map((employee) => {
        value.push(` ("${employee.name}", "${employee.age}", "${employee.favColor}")`)
    })
    const length = value.length
    value[length - 1] = value[length - 1].replace(')', ');')
    return value.join().replace('),,(', '),(')
}

app.post('/api/upload', (req, res) =>{
    console.log(req.body)
    connection.query(`INSERT INTO demo (name, age, favColor) VALUES ${values(req.body)}`)
    res.end()
})

app.get('/api/restore', (req, res) =>{
    console.log("Restore has been reached")
    connection.query("SELECT * FROM demo", (err, data) =>{
        console.log(data)
        res.send(data)
    })
    res.end()
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`)})