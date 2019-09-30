const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.KEY,
    database: 'ecomerce'
})

const app = express()
app.use(cors()) //enable connection to react app even though they're seperate
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const arrayIt = (arrayOfObjects) =>{
//     return arrayOfObjects.map(() => [property1, property2])
// }

const values = (objects) =>{ //This function is an older version to return values... keeping it for future usecases.
    const value = []
    objects.map((prop) => {
        value.push(` ("${prop.firstName}", "${prop.lastName}", "${prop.phoneNumber}", "${prop.email}", "${prop.address}")`)
    })
    const length = value.length
    value[length - 1] = value[length - 1].replace(')', ');')
    return value.join().replace('),,(', '),(')
}

const prodWithPrice = "SELECT * FROM products LEFT JOIN prices ON products.price_ID=prices.price_ID"
const sel = "SELECT * FROM "
const selProd = "SELECT * FROM products" //General select all products
const insert = "INSERT INTO "
const del = "DELETE FROM "
const ljPrices = "LEFT JOIN prices ON products.price_ID=prices.price_ID"

// function Contact(name, )

//sends all products down with no filter
app.get('/api/products', (req, res) =>{
    console.log("products has been reached")
    connection.query(`${prodWithPrice} LIMIT 20`, (err, data) =>{
        res.send(data)
    })
})

//send products base on product di
app.get('/api/products/:id', (req, res) =>{
    if(req.params.id !== ""){
        connection.query(`${selProd} ${ljPrices} WHERE product_ID = ${req.params.id} LIMIT 1`, (err, data) =>{
            res.send(data)
        })
    } else{
        console.log("Invalid url input")
    }
})

//sends products from mysql in order depending on the parameters
app.get(`/api/products/:orderBy/:isAscending`, (req, res) =>{
    const {orderBy, isAscending } = req.params
    connection.query(`${prodWithPrice} ORDER BY ${orderBy} ${isAscending} LIMIT 20`, (err, data) =>{
        res.send(data)
    })
})
//sends products from mysql organized by catagory
app.get(`/api/products/:orderBy/:isAscending/:catagory`, (req, res) =>{
    const { orderBy, isAscending, catagory } = req.params
    connection.query(`${prodWithPrice} WHERE description = "${catagory}" ORDER BY ${orderBy} ${isAscending} LIMIT 20`, (err, data) =>{
        res.send(data)
    })
})

//sends all contacts to react
app.get('/api/contacts', (req, res) => {
    connection.query(`${sel} contacts`, (err, data) =>{
        res.send(data)
    })
})

//gets profile base on inputted name
app.get('/api/user/:name', (req, res) =>{
    const { name }= req.params
    connection.query(`SELECT * FROM contacts WHERE firstName = "${ name }" LIMIT 1 ;`, (err, data) =>{
        console.table(data)
        res.send(data)
        err && console.log("Was not able to get contact by name")
    })
})


//sends a new contact to mysql from react
app.post('/api/newContact', (req, res) =>{
    const contact = req.body
    connection.query(`${insert} contacts(firstName, lastName, phoneNumber, emails, address_ID) VALUES ${values([contact])}`, () =>{
        console.log("New Contact was sent successfully")
    })
    res.end()
})

app.delete('/api/deleteContact/:id', (req, res) =>{
    const { id } = req.params
    connection.query(`${del} contacts WHERE contact_ID = ${id}`, (err, res) =>{
        err ? console.log("deletion has failed") : console.log("deletion was successful")
    })
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) })