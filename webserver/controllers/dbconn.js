var mysql = require('mysql')
module.exports = function () {  
    var con =  mysql.createConnection({ 
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'padawan'
    }) 

    con.on('error',function (err) {  
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Connection closed')
        }else{
            console.log(err)
        }
    })

    return con
}