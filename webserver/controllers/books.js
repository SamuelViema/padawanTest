var controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de libros'
        });
    },

    //Insertar libro
    insertBook: (req, res) => {
        let con = require('../controllers/dbconn')();

        //Obtener parametros POST
        let { isbn, title, author, release_date } = req.body;

        let users_id = res.decode.id

        let qry = "INSERT INTO `books` (`id`, `title`, `author`, `isbn`, `release_date`, `user_id`, `users_id`) VALUES (NULL, ?, ?, ?, ?, '1', ?);";
        let values = [title, author, isbn, release_date, users_id];
        //Ejecución de la consulta
        con.query(qry, values, function (err, result, fields) {
            if (err) {
                // Internal error message send
                res.status(500).json({
                    status: false,
                    message: err
                })
                con.end()
                return
            } else {
                if (result.affectedRows == 1) {
                    // Setup and send of response
                    res.status(200).json({
                        status: true,
                        book: result.insertId,
                    })
                }
                con.end();
            }
        })
    },

    //Consultar todos los libros
    getBooks: (req, res) => {
        let con = require('../controllers/dbconn')();

        let qry = "SELECT B.*, U.name FROM `books` B INNER JOIN users U ON B.users_id = U.id;";
        let values = [];
        //Ejecución de la consulta
        con.query(qry, values, function (err, result, fields) {
            if (err) {
                // Internal error message send
                res.status(500).json({
                    status: false,
                    message: err
                })
                con.end()
                return
            } else {
                // Setup and send of response
                res.status(200).json({
                    Status: 'Success',
                    books: result,
                })
                con.end();
            }
        })
    },

    //Eliminar book por id
    deleteBook: (req, res) => {
        let con = require('../controllers/dbconn')();

        //Obtener parametros GET
        var id = req.params.id

        let qry = "DELETE FROM `books` WHERE `books`.`id` = ?;";
        let values = [id];
        //Ejecución de la consulta
        con.query(qry, values, function (err, result, fields) {
            if (err) {
                // Internal error message send
                res.status(500).json({
                    status: false,
                    message: err
                })
                con.end()
                return
            } else {
                if (result.affectedRows == 1) {
                    // Setup and send of response
                    res.status(200).json({
                        status: true,
                    })
                }
                con.end();
            }
        })
    },



};  // end controller

module.exports = controller;