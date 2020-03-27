//Bibliotecas
const crypto = require('crypto');

//Modularização da função de geração de id único
module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}