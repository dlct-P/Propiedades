const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');



const app = express();

app.use(cors());
app.use(bodyparser.json());

//DB Conexión

const db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'propiedades',
   port:3306
});

//Revisar DB
db.connect(err=>{
    if(err){console.log('Error de BD');}
    console.log('Base de datos conectada...');
})

//Traer todas las propiedades
app.get('/propiedad',(req,result)=>{
    let qr = 'select * from propiedad';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'Error');
        }
        if(result.length>0){
            res.send({
                message:'Todas las propiedades',
                data:result
            });
        }
    });
});

//Traer una propiedad
app.get('/propiedad/:id',(req,result)=>{
    let gID = req.params.id;
    let qr = 'select * from propiedad where id = '${gID}'';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'Error');
        }
        if(result.length>0){
            res.send({
                message:'Una propiedad',
                data:result
            });
        }
        else {
            res.send({
                message:'No existe',
            });
        }
    });
});

//Crear una propiedad
app.post('/propiedad',(req,result)=>{
    console.log('Crear Propiedad');
    let propiedad = req.body;
    let nombrep = propiedad.nombre;
    let areap = propiedad.area;
    let cuartosp = propiedad.cuartos;

    let qr = 'insert into propiedad(nombre,area,cuartos) values('${nombrep}','${areap}','${cuartos}')';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'Error');
        }
        console.log(result,'Resultado');
            res.send({
                message:'Propiedad creada',
            });

    });
});

//Actualizar una propiedad
app.put('/propiedad/:id',(req,result)=>{

    console.log(req.body,'Actualizar propiedad');
    let gID = req.params.id;
    let propiedad = req.body;
    let nombrep = propiedad.nombre;
    let areap = propiedad.area;
    let cuartosp = propiedad.cuartos;

    let qr = 'update propiedad set nombre='${nombrep}', area='${areap}', cuartos='${cuartosp}' where id = '${gID}'';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'Error');
        }
            res.send({
                message:'Una propiedad fue actualizada',
            });

    });
});

//Eliminar una propiedad
app.delete('/propiedad/:id',(req,result)=>{
    let gID = req.params.id;
    let qr = 'delete from propiedad where id = '${gID}'';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'Error');
        }

            res.send({
                message:'Propiedad eliminada',
            });
    });
});





app.listen(3000,()=>{
    console.log('El servidor está corriendo...');
})

//Node 14.17.5 - Angular 12.2.2 - NPM, nodemon, npm init -y, npm i express body-parser cors mysql2





