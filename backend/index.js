const express = require('express');
//const bodyparser = require('express');
const cors = require('cors');
//const mysql = require('mysql2');
const mariadb = require('mariadb');
const bodyParser = require("body-parser");
// Ref another page const db = require("./index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Connection Pool

//const db = mysql.createConnection
const pool = mariadb.createPool({
   host:'localhost',
   user:'root',
   password:'',
   database:'propiedad',
   port:3306
});

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});

//check database connection

//db.connect(err=>{if (err) {console.log(err,'dberr')}console.log('Database connected ...');})

//get all data de tablas
//Async only for mariadb

app.get('/propiedad', async (req, res) => {
    try {
        const result = await pool.query("select * from propiedad");
        res.send({
            message:'Todos los datos de propiedades',
            data:result
        });
    } catch (err) {
        throw err;
    }
});

//get una propiedad
//MySQL query select from propiedad where id = ${id]
app.get('/propiedad/:id', async (req, res) => {
    let id = req.params.id;
    let qr = 'select * from propiedad where id = ?';
    try {
        const result = await pool.query(qr, id);
        res.send({
            message:'Una propiedad',
            data:result
        });
    } catch (err) {
        throw err;
    }
});

// Crear propiedad
app.post('/propiedad', async (req, res) => {
    let propiedad = req.body;

    let nombreP = propiedad.nombre;
    let areaP = propiedad.area;
    let cuartosN = propiedad.cuartos;
    let qr = 'insert into propiedad(nombre,area,cuartos) values (?)';
    try {
        const result = await pool.query(qr,
            [nombreP,areaP,cuartosN]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

//Modificar propiedad
app.put('/propiedad/:id', async (req, res) => {
    let propiedad = req.body;

    let id = req.params.id;
    let nombreP = propiedad.nombre;
    let areaP = propiedad.area;
    let cuartosN = propiedad.cuartos;

    let qr = 'update propiedad set nombre = ?, area = ?, cuartos =? where id = ?';

    try {
        const result = await pool.query(qr,
            [nombreP, areaP,cuartosN, id]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

//Borrar propiedad
app.delete('/propiedad/:id', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await pool.query("delete from propiedad where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    }
});




app.listen(3000,()=>{
    console.log('server running..');
});