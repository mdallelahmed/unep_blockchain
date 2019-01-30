/*
***********************************************************************************************************
***********************************************************************************************************
***************************************$UNEP REST API$*************************************************
********************************************$2019$************************************************************
****************************************$MDALEL$$$AHMED$$*******************************************************
********************************************$ISEP$************************************************************
*******************************$©©©$AHMED.MDALLEL@ESPRIT.TN$©©©$**********************************************
***********************************************************************************************************
***********************************************************************************************************
*/
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
//changer votre config
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'unep',
    port: '8889',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

/*
***********************************************************************************************************
***********************************************************************************************************
***************************************$table air_quality$*************************************************
***********************************************************************************************************
***********************************************************************************************************
*/
//Get all device
app.get('/AirDevice', (req, res) => {
    mysqlConnection.query('SELECT * FROM AirDevice', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an device
app.get('/AirDevice/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM AirDevice WHERE id_device = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an device
app.delete('/AirDevice/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM AirDevice WHERE id_device = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an device
app.post('/AirDevice', (req, res) => {
    let device = req.body;
    var sql = "INSERT INTO AirDevice (country,state,date,Latitude,Longitude,status) VALUES (?,?,?,?,?,?)"; 
    
    mysqlConnection.query(sql, [device.country, device.state,device.date,device.latitude,device.longitude,device.status], (err, rows, fields) => {
        if (!err)
        mysqlConnection.query('SELECT * FROM AirDevice', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        else
            console.log(err);
    })
});

//Update an device
app.put('/AirDevice/:id', (req, res) => {
    let device = req.body;
    var sql = "UPDATE AirDevice SET country = ?,state = ?,date = ?, Latitude = ? , Longitude = ? , status = ? WHERE id_device = ?"; 

    mysqlConnection.query(sql, [device.country, device.state,device.date,device.latitude,device.longitude,device.status,req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
/*
***********************************************************************************************************
***********************************************************************************************************
***************************************$table alert$*******************************************************
***********************************************************************************************************
***********************************************************************************************************
*/
//Get all alert
app.get('/alert', (req, res) => {
    mysqlConnection.query('SELECT * FROM alert', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an alert
app.get('/alert/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM alert WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an alert
app.delete('/alert/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM alert WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an alert
app.post('/alert', (req, res) => {
    let alert = req.body;
    var sql = "INSERT INTO alert (date,motif,user_id,device_id) VALUES (?,?,?,?)"; 
    
    mysqlConnection.query(sql, [alert.date, alert.motif, alert.user_id,alert.device_id], (err, rows, fields) => {
        if (!err)
        mysqlConnection.query('SELECT * FROM alert', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        else
            console.log(err);
    })
});

//Update an alert
app.put('/alert/:id', (req, res) => {
    let alert = req.body;
    var sql = "UPDATE alert SET date = ?,motif = ?,user_id = ?,device_id = ? WHERE id = ?"; 

    mysqlConnection.query(sql, [alert.date, alert.motif, alert.user_id,alert.device_id,req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
/*
***********************************************************************************************************
***********************************************************************************************************
***************************************$table user$*******************************************************
***********************************************************************************************************
***********************************************************************************************************
*/
//Get all user
app.get('/user', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an user
app.get('/user/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM user WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an user
app.delete('/user/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM user WHERE user_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an user
app.post('/user', (req, res) => {
    let user = req.body;
    var sql = "INSERT INTO user (first_name,last_name,email,password) VALUES (?,?,?,?)"; 
    
    mysqlConnection.query(sql, [user.first_name, user.last_name, user.email,user.password], (err, rows, fields) => {
        if (!err)
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        else
            console.log(err);
    })
});

//Update an user
app.put('/user/:id', (req, res) => {
    let user = req.body;
    var sql = "UPDATE user SET first_name = ?,last_name = ?,email = ?,password = ? WHERE user_id = ?"; 

    mysqlConnection.query(sql, [user.first_name, user.last_name, user.email,user.password,req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
/*
***********************************************************************************************************
***********************************************************************************************************
***************************************$table block$*************************************************
***********************************************************************************************************
***********************************************************************************************************
*/
//Get all block
app.get('/block', (req, res) => {
    mysqlConnection.query('SELECT * FROM block', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an block
app.get('/block/:index', (req, res) => {
    mysqlConnection.query('SELECT * FROM block WHERE indexblock = ?', [req.params.index], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Insert an block
app.post('/block', (req, res) => {
    let block = req.body;
    var sql = "INSERT INTO block (indexblock,timestamp,hash,previousHash,data) VALUES (?,?,?,?,?)"; 
    
    mysqlConnection.query(sql, [block.indexblock, block.timestamp, block.hash,block.previousHash,block.data], (err, rows, fields) => {
        if (!err)
        mysqlConnection.query('SELECT * FROM block', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
        else
            console.log(err);
    })
});


