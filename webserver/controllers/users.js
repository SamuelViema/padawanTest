var controller = {

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de usuarios'
        });
    },

    //Insertar nuevo usuario
    insertUser: (req, res) => {
        let con = require('../controllers/dbconn')();

        //Obtener parametros POST
        let { name, email, password } = req.body;

        //Verificar que los parametros contengan datos
        if ((typeof email == 'undefined' || email == "") || (typeof password == 'undefined' || password == "") || (typeof name == 'undefined' || name == "")) {
            res.status(400).json({
                status: false,
                message: "Se necesitan todos los datos"
            })
        }
        else {
            let qry = "INSERT INTO `users` (`id`, `email`, `password`, `name`) VALUES (NULL, ?, SHA1(?), ?);";
            let values = [email, password, name];
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
                            user: result.insertId,
                        })
                    }
                    con.end();
                }
            })
        }

    },

    logIn: (req, res) => {
        let con = require('../controllers/dbconn')();
        let jwt = require('jsonwebtoken');

        //Obtener parametros POST
        let { email, password } = req.body;

        let qry = "SELECT * FROM `users` WHERE `email` = ? AND `password` = SHA1(?);";
        let values = [ email, password ];
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
                if (result.length > 0) {
                    //Creación del Token
                    const token = jwt.sign({
                        id: result[0].id,
                        name: result[0].name,
                    }, process.env.SEC_KEY, {
                            expiresIn: '24h',
                    });

                    // Setup and send of response
                    res.status(200).json({
                        Status: 'Success',
                        token: token,
                    })
                } else {
                    res.status(401).json({
                        status: false,
                        message: 'credenciales invalidas'
                    })
                }
                con.end();
            }
        })
    },


};  // end controller

module.exports = controller;