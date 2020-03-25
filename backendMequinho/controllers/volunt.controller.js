//definição de constantes
const connect = require('../config/connect');
const jsonMessages = require('../assets/jsonMessages/bd.js');


//COLOCAR AQUI FUNCOES ---------------

function activate(req, res) {
    const id = req.sanitize('id').escape();

    query = connect.con.query('UPDATE Voluntario SET estado = "ativo" where idVoluntario=?', id, function(err, rows,
        fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Voluntario', function(err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);

    });
}

//função de leitura que retorna o resultado de um idvoluntario
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idvoluntario = req.sanitize('idvoluntario').escape();
    const post = {
        idvoluntario
    };
    connect.con.query('SELECT nome, email, contacto, localidade from Voluntario', post,
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            }
            else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}


//função de gravação que recebe os 4 parâmetros
function save(req, res) {
    //receber os dados do formulário que são enviados por post

    var post = {
        nome: req.body.nome,
        email: req.body.email,
        contacto: req.body.contacto,
        localidade: req.body.localidade,

    };

    query = connect.con.query('INSERT INTO Voluntario SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });

}


//efetuar update de todos os dados para um determinado idvoluntario
function update(req, res) {
    //receber os dados do formulário de voluntário que são enviados por post

    const idvoluntario = req.sanitize('idvoluntario').escape();


    var update = {
        nome: req.body.nome,
        email: req.body.email,
        contacto: req.body.contacto,
        localidade: req.body.localidade,

        idvoluntario
    };
    query = connect.con.query('INSERT INTO Voluntario SET  nome =?, email=?, contacto =?, localidade =? where idvoluntario=?', update, function(err, rows,
        fields) {

        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });

}
//função que apaga todos os dados de um idvoluntario
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idvoluntario = req.sanitize('idvoluntario').escape();
    const post = {
        idvoluntario
    };
    connect.con.query('DELETE from Voluntario where idvoluntario = ?', post, function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}




//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID,
    activate: activate
};