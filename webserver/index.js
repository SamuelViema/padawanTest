let app = require('./app');
let port =  process.env.PORT || 3900;

// Variables de entorno para Passwords
process.env.SEC_KEY = "$$P@D4W@NPRU3B4$$";

/* Crear servidor y escuchar peticiones HTTP */
app.listen(port, () => {
    console.log('servidor corriendo en http://localhost:' + port);
})