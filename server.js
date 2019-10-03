const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
require('dotenv').config()
const helmet = require('helmet')


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
// app.use(helmet())
// app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))

// const arrayIt = (arrayOfObjects) =>{ // this fuction exists for future use cases
//     return arrayOfObjects.map(() => [property1, property2])
// }

//this function was created so that only specific values are returned in insert values... see line 92
const contactValues = (objects) =>{ // this function can be upgraded to have prop as the parameter
    const value = []
    objects.map((prop) => {
        value.push(` ("${prop.firstName}", "${prop.lastName}", "${prop.phoneNumber}", "${prop.email}", "${prop.address}")`)
    })
    const length = value.length
    value[length - 1] = value[length - 1].replace(')', ');') // insure last insertion ends with ";"
    return value.join().replace('),,(', '),(')
}

const prodWithPrice = "SELECT * FROM products LEFT JOIN prices ON products.price_ID=prices.price_ID" //products table left joins to price table on product_ID 
const sel = "SELECT * FROM "
const selProd = "SELECT * FROM products" //General select all products
const insert = "INSERT INTO "
const del = "DELETE FROM "
const ljPrices = "LEFT JOIN prices ON products.price_ID=prices.price_ID"

/* BEGINNING OF GET REQUESTS */
//sends all products down with no filter
app.get('/api/products', (req, res) =>{
    console.log("products has been reached")
    connection.query(`${prodWithPrice} LIMIT 20`, (err, data) =>{
        res.send(data)
    })
})

//send products base on the product's id to react
app.get('/api/product/:id', (req, res) =>{
    if(req.params.id !== ""){
        //products table left joins to price table on product_ID 
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

//allows user to contact into their profile
app.get('/api/user/:username/:password', (req, res) =>{
    const { username, password } = req.params
    connection.query(`SELECT contact_ID FROM logins WHERE username = "${ username }" AND password = "${ password }"`, (err, data) =>{
        res.send(data)
    })
})

//sends all contacts to react from sql databases
app.get('/api/contacts', (req, res) => {
    connection.query(`${sel} contacts`, (err, data) =>{
        res.send(data)
    })
})

//
app.get(`/api/contact/:id`, (req, res) =>{
    const { id } = req.params
    connection.query(`${ sel } contacts WHERE contact_ID = ${ id }`, (err, data) =>{
        res.send(data)
    })
})
/* END OF GET REQUESTS */

/* START OF POST REQUESTS */
//sends a new contact to mysql from react
app.post('/api/newContact', (req, res) =>{ 
    const contact = req.body
    connection.query(`${insert} contacts(firstName, lastName, phoneNumber, emails, address_ID) VALUES ${contactValues([contact])}`, (err, result, field) =>{
        if (err) {
            console.error("something when wrong")
        } else{
            console.log("New Contact was sent successfully")
            const logins = [
                //result.insertId returns the id of the new contact which is as the FK in the login table
                [ result.insertId, contact.username, contact.password ],
            ]
            connection.query(`${insert} logins(contact_ID, username, password) VALUES ? `, [logins], (err, res) =>{
                err ? console.log("new login failed to send") : console.log("new login was send successfully")
            })
        }
        res.end()
    })
})
/* END OF POST REQUETS */

/* START OF DELETE REQUESTS */
//delete contact by id
app.delete('/api/deleteContact/:id', (req, res) =>{
    const { id } = req.params
    connection.query(`${del} contacts WHERE contact_ID = ${id}`, (err, res) =>{
        err ? console.log("deletion has failed") : console.log("deletion was successful")
    })
})

//delete product by id
app.delete('api/deleteProduct/:id', (req, res) =>{
    const { id } = req.params
    connection.query(`${del} products WHERE product_ID = ${ id }`, (err, res) =>{
        err ? console.log("did not send to the database correctly") : console.log("Send was successful")
    })
})
/* END OF DELETE REQUEST */

module.exports = app //exporting app to be tested

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) })