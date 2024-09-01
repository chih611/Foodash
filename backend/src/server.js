// require('dotenv').config();
import express from 'express';
import path from 'path';
import {connection} from './config/database.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
// const express = require('express')
const app = express()
// const path = require('path');
// const connection = require('./config/database');
const port = process.env.DB_PORT;
const hostname = process.env.DB_HOST;

//config template
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// config static file
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    connection.query('SELECT * FROM ITEMS', function (err, rows, fields) {
    res.send(JSON.stringify(rows));
});
});

 app.listen(8080, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
