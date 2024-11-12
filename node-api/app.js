var express = require('express');

var app = express();
app.use(express.json());

// Rutas
app.get('/test', function(req, res) {
    res.send('API en Node andando.');
});

// Iniciar el servidor
var PORT = 1000;
app.listen(PORT, function() {
    console.log('Servidor corriendo en el puerto ' + PORT);
});
