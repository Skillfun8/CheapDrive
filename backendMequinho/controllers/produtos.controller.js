//definição de constantes
const connect = require('../config/connect');
const jsonMessages = require( '../assets/jsonMessages/bd.js');   

//COLOCAR AQUI FUNCOES ---------------


//função de leitura que retorna o resultado no callback
function read(req, res) {
//criar e executar a query de leitura na BD
 connect.con.query('SELECT * from Produto', function (err,
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

//função de leitura que retorna o resultado de um idproduto
function readID(req, res) {
//criar e executar a query de leitura na BD
const idproduto = req.sanitize('idproduto').escape();
const post = {
idproduto
};
 connect.con.query('SELECT designacao, preco, contacto, email, localidade from Produto where idproduto = ?', post,
function (err, rows, fields) {
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

//função de gravação que recebe os 5 parâmetros
function save(req, res) {
//receber os dados do formuário que são enviados por post

var post = {
designacao: req.body.designacao,
preco: req.body.preco,
contacto: req.body.contacto,
email: req.body.email,
localidade: req.body.localidade,
};

query = connect.con.query('INSERT INTO Produto SET ?', post, function (err, rows, fields) {
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
//efetuar update de todos os dados para um determinado idproduto
function update(req, res) {
//receber os dados do formulário de sócio que são enviados por post
const idproduto = req.sanitize('idproduto').escape();
var update = {
designacao: req.body.designacao,
preco: req.body.preco,
contacto: req.body.contacto,
email: req.body.email,
localidade: req.body.localidade,

idproduto};
query = connect.con.query('INSERT INTO Produto SET  designacao =?, preco =?, contacto =?, localidade =?, email =?  where idproduto=?', update, function (err, rows,
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
//função que apaga todos os dados de um idproduto
function deleteID(req, res) {
//criar e executar a query de leitura na BD
const idproduto = req.sanitize('idproduto').escape();
const post = {
idproduto
};
 connect.con.query('DELETE from Produto where idproduto = ?', post, function (err, rows, fields) {
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
deleteID: deleteID
};