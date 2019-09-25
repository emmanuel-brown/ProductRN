const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lilman10',
    database: 'ecomerce'
})

const app = express()
app.use(cors())
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const values = (objects) =>{ //This function is an older version to return values... keeping it for future usecases.
    const value = []
    objects.map((employee) => {
        value.push(` ("${employee.name}", "${employee.price}", "${employee.description}", "${employee.image}")`)
    })
    const length = value.length
    value[length - 1] = value[length - 1].replace(')', ');')
    return value.join().replace('),,(', '),(')
}

app.get('/api/restore', (req, res) =>{
    console.log("Restore has been reached")
    connection.query("SELECT * FROM products LEFT JOIN prices ON products.price_ID=prices.price_ID LIMIT 20", (err, data) =>{
        res.send(data)
    })
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`)})