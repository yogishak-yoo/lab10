const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port=3000
const hostname="localhost"
const tbl = "wood"
const db = "lab"


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kpsy@2022',
    database: 'lab'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connection established')
})

app.get('/', (req, res) => {
    
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})



app.post('/new', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    
    var resp = req.body
    console.log(resp['emp_id'])
    connection.query("INSERT into " + tbl + " VALUES (" + resp['emp_id'] + ",\'" + resp['emp_name'] + "\',\'" + resp['emp_designation'] + "\',\'" + resp['emp_department'] + "\'," + resp['emp_salary'] + ",\'" + resp['emp_location'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})
app.post('/update', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var resp = req.body
    console.log(resp['emp_id'])
    connection.query("UPDATE " + tbl + " SET emp_name= \'" + resp['emp_name'] + "\', emp_designation=\'" + resp['emp_designation'] + "\',emp_department=\'" + resp['emp_department'] + "\',emp_salary=" + 
    resp['emp_salary'] + ",emp_location=\'" + resp['emp_location'] + "\' where emp_id = " + resp['emp_id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/search', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var getStatus = req.body
    connection.query("SELECT * from " + tbl + " where emp_department = \'" + getStatus['emp_department'] + "\'", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var delId = req.body['delID']
    connection.query("DELETE from " + tbl + " where emp_id = " + delId, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})