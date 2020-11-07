module.exports = function (req, res, next) {
    let jwt = require('jsonwebtoken');
    //Obtener parametro del Header
    const token = req.body.token;

    //Verificar que exita el token
    if (token) {
        //Verificar que el token sea valido
        jwt.verify(token, process.env.SEC_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    status: false,
                    message: "Token inválida"
                })
            } else {
                res.decode = decoded;
                next();
            }
        });
    } else {
        res.status(400).json({
            status: false,
            message: "No se envió el token"
        })
    }
}