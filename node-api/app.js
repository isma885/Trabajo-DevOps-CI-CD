var express = require('express');
//const mysql = require('mysql2');
//const bcrypt = require('bcrypt');
//const dotenv = require('dotenv');
//dotenv.config();

var app = express();
app.use(express.json());

/*
// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.MYSQL_DATABASE_HOST,
    user: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASSWORD,
    database: process.env.MYSQL_DATABASE_DB
});
*/

/*
// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos MySQL');
});
*/

// Rutas
app.get('/test', function(res) {
    res.send('API en Node andando.');
});

/*

// Crear usuario
app.post('/users', (req, res) => {
    const { name, email, pwd } = req.body;

    if (!name || !email || !pwd) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = bcrypt.hashSync(pwd, 10);
    const query = 'INSERT INTO tbl_user (user_name, user_email, user_password) VALUES (?, ?, ?)';

    db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            return res.status(500).json({ error: 'Error al agregar el usuario' });
        }
        res.status(201).json({ message: 'Usuario agregado correctamente' });
    });
});

// Obtener todos los usuarios
app.get('/users', (req, res) => {
    db.query('SELECT * FROM tbl_user', (err, rows) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.status(200).json(rows);
    });
});

// Obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tbl_user WHERE user_id = ?', [id], (err, row) => {
        if (err) {
        console.error('Error al obtener el usuario:', err);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (!row.length) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(row[0]);
    });
});

// Actualizar usuario
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, pwd } = req.body;

    if (!name || !email || !pwd) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = bcrypt.hashSync(pwd, 10);
    const query = 'UPDATE tbl_user SET user_name = ?, user_email = ?, user_password = ? WHERE user_id = ?';

    db.query(query, [name, email, hashedPassword, id], (err, result) => {
        if (err) {
        console.error('Error al actualizar el usuario:', err);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
        if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    });
});

// Eliminar usuario
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tbl_user WHERE user_id = ?', [id], (err, result) => {
        if (err) {
        console.error('Error al eliminar el usuario:', err);
        return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    });
});

*/

// Iniciar el servidor
var PORT = 1000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
