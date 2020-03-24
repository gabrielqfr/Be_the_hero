/**Configuração da conexão com o BD de dev */

const knex = require('knex');
const configuracao = require('../../knexfile');

const conexao = knex(configuracao.development);

module.exports = conexao;