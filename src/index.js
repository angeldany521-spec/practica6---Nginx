const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/', (req, res) => {
  connection.query('SELECT NOW() AS fecha_db', (err, results) => {
    if (err) {
      res.status(500).send('<h1>Hola Mundo!</h1><p>Error de conexión a la BD.</p>');
    } else {
      res.send(`<h1>Hola Mundo!</h1><p>Conexión exitosa a MySQL. Hora en BD: ${results[0].fecha_db}</p>`);
    }
  });
});

app.listen(port, () => {
  console.log(`Aplicación ejecutándose en el puerto ${port}`);
});