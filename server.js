const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Question 1 - Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Question 2 - Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Question 3 - Filter patients by First Name
app.get('/patients/:firstName', (req, res) => {
  const { firstName } = req.params;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(sql, [firstName], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Question 4 - Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params;
  const sql = 'SELECT first_name, last_name FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
