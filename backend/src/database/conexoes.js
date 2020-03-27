/**Configuração da conexão com o BD de dev */
const knex = require('knex');
const configuracao = require('../../knexfile');

/**Configuração da conexão com o BD de teste ou dev dependendo do ambiente iniciado */
const config = process.env.NODE_ENV === 'test' ? configuracao.test : configuracao.development;

/**Export da variável de conexão com o BD */
const conexao = knex(config);

module.exports = conexao;