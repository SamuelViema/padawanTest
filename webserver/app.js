
/* Cargar Modulos de node para crear el servidor */

let espress = require('express');
let bodyParser = require('body-parser');

/* Ejecutar espress (http) */

let app = espress();

/* Cargar ficheros rutas */
let booksRoutes = require('./routes/books');
let usersRoutes = require('./routes/users');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* Añadir prefijos a rutas / Cargar rutas */

app.use('/books', booksRoutes);
app.use('/auth', usersRoutes);

/* Exportar modulo (fichero actual) */

module.exports = app;