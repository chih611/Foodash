// server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
    return;
  }
  console.log(`Server running on port ${PORT}`);
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the FoodDash API!');
});


// Demo
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello from the FoodDash APIssss!' });
});


// Example API endpoint to get users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving users');
      return;
    }
    res.json(results);
  });
});