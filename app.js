const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

app.use(express.json());

const dataBase = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

app.get('/randomUser', (req,res) => {
  const query = "SELECT * FROM user ORDER BY RAND() LIMIT 1;";
  dataBase.query(query, (error, result) => {
    if(error) {
      res.status(500).send(error)
    }
    else {
      res.status(200).send(result)
    }
  });  
});

app.get('/allUser', (req,res) => {
  const query = "SELECT * FROM user;";
  dataBase.query(query, (error, result) => {
    if(error) {
      res.status(500).send(error)
    }
    else {
      res.status(200).send(result)
    }
  });  
});

app.use((req, res) => {
  res.status(404).send('404-Fehler');
});

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log('Server läuft auf Port '+port);
});